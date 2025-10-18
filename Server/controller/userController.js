
import sql from "../config/db.js";




// 📜 Get All User Creations
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const creations = await sql`
      SELECT * FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("Get Creations Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

