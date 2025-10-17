import { clerkClient } from "@clerk/express";
import OpenAI from "openai";
import sql from "../config/db.js"
import axios from "axios";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");



import {v2 as cloudinary} from 'cloudinary'

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

    const content = response.choices[0].message.content

   await sql`INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId}, ${prompt}, ${content}, 'article')`;


   if(plan !== 'premium'){
     await clerkClient.users.updateUserMetadata(userId ,{
        privateMetadata:{
            free_usage : free_usage +1
        }
     })
   }

   res.json({success : true ,content})

  } catch (error) {
    console.log(error.message);
    res.json({success : false ,message: error.message})
  }
};




// APi to Generate Blog Title 


export const generateBlogTitle = async (req, res) => {
  try {
   const { userId } = await req.auth();
    const { prompt} = req.body;
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
      max_tokens: 100,
    });

    const content = response.choices[0].message.content

   await sql`INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;


   if(plan !== 'premium'){
     await clerkClient.users.updateUserMetadata(userId ,{
        privateMetadata:{
            free_usage : free_usage +1
        }
     })
   }

   res.json({success : true ,content})

  } catch (error) {
    console.log(error.message);
    res.json({success : false ,message: error.message})
  }
};


// Api to generate image from text prompt


export const generateImage = async (req, res) => {
  try {
   const { userId } = await req.auth();
    const { prompt , publish} = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only. Please upgrade to access it.",
      });
    }

   const formData = new FormData()
  formData.append('prompt', prompt)

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

const base64Image = `data:image/png;base64,${Buffer.from(data , 'binary').toString('base64')}`;

const {secure_url} =await cloudinary.uploader.upload(base64Image)



   await sql`INSERT INTO creations (user_id, prompt, content, type , publish)
VALUES (${userId}, ${prompt}, ${secure_url}, 'image' , ${publish ?? false})`;



   res.json({success : true , content:secure_url})

  } catch (error) {
    console.log(error.message);
    res.json({success : false ,message: error.message})
  }
};






// Api to remove background from Image

export const removeBackground = async (req, res) => {
  try {
   const { userId } = await req.auth();
   const {image} = req.file;
    const plan = req.plan;

  if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only. Please upgrade to access it.",
      });
    }

const {secure_url} =await cloudinary.uploader.upload(image.path ,{
     transformation: [
        {
          effect : "background_removal",
          background_removal: "remove_the_background"
        }
     ]
})



  await sql`INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId},'Remove background from image' , ${secure_url}, 'image')`;



   res.json({success : true ,content : secure_url})

  } catch (error) {
    console.log(error.message);
    res.json({success : false ,message: error.message})
  }
};


// Api to remove Object from Image

export const removeObject = async (req, res) => {
  try {
   const { userId } = await req.auth();
    const { object } =  req.body;
   const {image} = req.file;
    const plan = req.plan;

  if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is available for premium users only. Please upgrade to access it.",
      });
    }

const {public_id} =await cloudinary.uploader.upload(image.path)

const imageUrl = cloudinary.url(public_id, {
      transformation: [ { effect : `gen_remove:${object}`} ],
      resource_type: 'image',
})


  await sql`INSERT INTO creations (user_id, prompt, content, type)
VALUES (${userId},${`Removed ${object} from image`} , ${imageUrl}, 'image')`;


   res.json({success : true ,content : imageUrl})

  } catch (error) {
    console.log(error.message);
    res.json({success : false ,message: error.message})
  }
};





// Api to review resume from Image

export const resumeReview = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const resume = req.file;
    const plan = req.plan;

    // Basic validation
    if (!resume) {
      return res.json({ success: false, message: "No resume file uploaded." });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message:
          "This feature is available for premium users only. Please upgrade to access it.",
      });
    }

    // File size limit 5MB
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size exceeds 5MB limit.",
      });
    }

    // Read file and extract text
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 100) {
      return res.json({
        success: false,
        message: "Invalid or empty resume file.",
      });
    }

    // 🧠 Generate analysis prompt
    const prompt = `
You are an expert HR and career consultant. Review the following resume text and provide:
1. A summary of the candidate's profile.
2. Strengths and achievements.
3. Weaknesses or areas for improvement.
4. Suggestions to enhance the resume for job applications.
5. A professional score out of 10 based on clarity, structure, and relevance.

Resume Content:
${resumeText}
    `;

     const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content

    
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, "Resume Review", ${content}, "resume-review");
    `;

    res.json({
      success: true,
      message: "Resume analyzed successfully.",
      content,
    });
  } catch (error) {
    console.error("Resume Review Error:", error.message);
    res.json({
      success: false,
      message: error.message || "Failed to analyze resume.",
    });
  }
};