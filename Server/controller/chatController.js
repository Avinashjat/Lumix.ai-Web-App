import OpenAI from "openai";
import sql from "../config/db.js";
import { extractTextFromPDF } from "../config/pdfReader.js";
import fs from "fs";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const chatAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Get user from Clerk middleware
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    let fileText = "";

    if (req.file) {
      const filePath = req.file.path;
      const mimeType = req.file.mimetype;

      // PDF
      if (mimeType === "application/pdf") {
        fileText = await extractTextFromPDF(filePath);
      }

      // Images
      else if (mimeType.startsWith("image/")) {
        fileText =
          "User uploaded an image. Analyze the image and answer the question.";
      }

      // Text / DOC / other readable files
      else {
        fileText = fs.readFileSync(filePath, "utf8");
      }
    }

    const finalPrompt = `
You are Lumix AI, a helpful assistant.

Instructions:
- Give clear and structured answers.
- Use headings, bullet points, and short paragraphs.
- If code is requested, format it properly in code blocks.
- Keep responses concise but informative.

User Question:
${prompt}

File Content (if provided):
${fileText}

Provide a helpful answer.
`;
    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 6000,
    });

    const content = response.choices[0].message.content;

    // Save to Neon DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'chat')
    `;

    res.json({
      success: true,
      message: content,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
