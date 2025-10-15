import { clerkClient } from "@clerk/express";
import OpenAI from "openai";
import sql from "../config/db.js"
import axios from "axios";
import fs from "fs";



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




// ✅ Corrected API to Review and Analyze Resume
export const resumeReview = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const file = req.file; // ✅ Multer gives single file here
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!file) {
      return res.json({ success: false, message: "No resume file uploaded." });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    let resumeText = "";
    let resumeUrl = null;
    const fileType = file.mimetype;

    // ✅ Handle PDF resume
    if (fileType === "application/pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdf(dataBuffer);
      resumeText = data.text.trim();
    }

    // ✅ Handle Image resume
    else if (fileType.startsWith("image/")) {
      const { secure_url } = await cloudinary.uploader.upload(file.path, {
        folder: "resumes",
      });
      resumeUrl = secure_url;
    } else {
      return res.json({
        success: false,
        message: "Unsupported file type. Please upload a PDF or image.",
      });
    }

    // ✅ AI prompt generation
    const prompt = resumeText
      ? `
You are a professional HR recruiter and resume expert.
Analyze the following resume text and provide:
1. A summary of the candidate's background.
2. Strengths and achievements.
3. Weaknesses or areas for improvement.
4. Professional, actionable feedback.

Resume Text:
${resumeText}
`
      : `
You are a professional HR recruiter and resume expert.
The candidate's resume is available at ${resumeUrl}.
Please analyze the resume visually (layout, clarity, presentation, readability)
and provide:
1. A summary of the candidate's background.
2. Strengths.
3. Weaknesses.
4. Suggestions for improvement.
`;

    // ✅ Send prompt to Gemini
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    });

    const analysis = response.choices[0].message.content;

    // ✅ Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${"Resume Review"}, ${analysis}, 'resume-review')
    `;

    // ✅ Update free usage count
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    // ✅ Clean up local file
    fs.unlinkSync(file.path);

    // ✅ Send response
    res.json({
      success: true,
      content: analysis,
      resume_url: resumeUrl,
      file_type: fileType,
    });
  } catch (error) {
    console.error("Resume Review Error:", error.message);
    res.json({
      success: false,
      message: error.message || "Failed to analyze resume.",
    });
  }
};