import { clerkClient } from "@clerk/express";
import OpenAI from "openai";
import sql from "../config/db.js";
import axios from "axios";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

import { v2 as cloudinary } from "cloudinary";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Api to Generate Article

export const generateArticle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue. ",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId}, ${prompt}, ${content}, 'article')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// APi to Generate Blog Title

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { keyword, category } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!keyword || !category) {
      return res.json({
        success: false,
        message: "Both keyword and category are required.",
      });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue. ",
      });
    }

    const prompt = `
Generate 10 engaging and SEO-optimized blog titles related to "${keyword}" 
under the "${category}" category. 
Titles should be creative, clear, and under 10 words each.
Only return the list of titles, one per line.
    `;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 150,
    });

    const content = response.choices[0].message.content;

    const titles = content
      .split("\n")
      .map((t) => t.replace(/^[\d\-\.\)\s]+/, "").trim()) // remove numbering
      .filter((t) => t.length > 0);

    await sql`INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId}, ${prompt},${titles.join("; ")},'blog-title')`;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, titles });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Api to generate image from text prompt

export const generateImage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "This feature is available for premium users only. Please upgrade to access it.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.IMAGE_API_KEY,
          ...formData.getHeaders?.(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations (user_id, prompt, content, type , publish)
VALUES (${userId}, ${prompt}, ${secure_url}, 'image' , ${publish ?? false})`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Api to remove background from Image

export const removeBackground = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const plan = req.plan;

    if (!req.file)
      return res.json({ success: false, message: "No file uploaded" });

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "This feature is available for premium users only. Please upgrade to access it.",
      });
    }

    // Convert buffer to base64
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64, {
      transformation: [{ effect: "background_removal" }],
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Api to remove Object from Image


export const removeObject = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const plan = req.plan;
    const description = req.body.description?.trim();

    if (!req.file)
      return res.json({ success: false, message: "No file uploaded" });

    if (!description)
      return res.json({
        success: false,
        message: "Please describe the object clearly (e.g., 'red apple on left')",
      });

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available only to premium users. Please upgrade to use it.",
      });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // ✅ Works for full descriptive prompts (multi-word)
    const { secure_url } = await cloudinary.uploader.upload(base64, {
      raw_transformation: `e_gen_remove:prompt_${description.replace(/ /g, '_')}`,
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed: ${description}`}, ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



// Api to review resume from Image

export const resumeReview = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (!resume) {
      return res.json({ success: false, message: "Please upload a resume file." });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size must be less than 5MB.",
      });
    }

    // Extract text from PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.json({ success: false, message: "Unable to read text from resume." });
    }

    const prompt = `
You are an expert HR consultant. Analyze the resume in detail and provide:
1. Candidate Summary
2. Strengths and Achievements
3. Weaknesses / Areas to Improve
4. Specific Suggestions to Improve the Resume
5. Professional Score (0-10)

Resume:
${resumeText}
`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 1200,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
    `;

    return res.json({
      success: true,
      message: "Resume reviewed successfully.",
      content,
    });
  } catch (error) {
    console.error("Resume Review Error:", error);
    return res.json({ success: false, message: "Something went wrong." });
  }
};
