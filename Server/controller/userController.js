import sql from "../config/db.js";

// 📜 Get User Creations (Clerk Auth)
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations = await sql`
      SELECT *
      FROM creations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 10
    `;

    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    console.error("Get Creations Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📜 Get Published Creations
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT *
      FROM creations
      WHERE publish = true
      ORDER BY created_at DESC
    `;

    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    console.error("Get Published Creations Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ❤️ Toggle Like
export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`
      SELECT * FROM creations WHERE id = ${id}
    `;

    if (!creation) {
      return res.status(404).json({
        success: false,
        message: "Creation not found",
      });
    }

    const likes = creation.likes || [];
    const userIdStr = String(userId);

    const updatedLikes = likes.includes(userIdStr)
      ? likes.filter(uid => uid !== userIdStr)
      : [...likes, userIdStr];

    await sql`
      UPDATE creations
      SET likes = ${sql.array(updatedLikes, "text")}
      WHERE id = ${id}
    `;

    res.status(200).json({
      success: true,
      message: "Likes updated",
    });
  } catch (error) {
    console.error("Toggle Like Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
