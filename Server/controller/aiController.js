import { clerkClient } from "@clerk/express";
import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

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




export const reviewResume = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Parse PDF
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    // Extract text content
    const resumeText = pdfData.text;

    // Simple example: basic keyword analysis
    const analysis = analyzeResume(resumeText);

    // Delete uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      analysis,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Basic analysis logic (you can expand this)
function analyzeResume(text) {
  const keywords = ["React", "Node", "MongoDB", "Express", "JavaScript"];
  const matched = keywords.filter((word) => text.includes(word));
  return {
    totalWords: text.split(/\s+/).length,
    foundSkills: matched,
    summary: `Your resume mentions ${matched.length} of ${keywords.length} key skills.`,
  };
}
