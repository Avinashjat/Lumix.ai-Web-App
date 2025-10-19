
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



// 📜 Get All Publish Creations
export const getPublishedCreations = async (req, res) => {
  try {

    const creations = await sql`
      SELECT * FROM creations
      WHERE publish = true
      ORDER BY created_at DESC
    `;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("Get Creations Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//  toggle like creation

export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = await req.auth();  
     const { id } = req.body;

     const [creation] = await sql`
      SELECT * FROM creations
      WHERE id = ${id}
    `;

    if(!creation){
      return res.json({ success: false, message: "Creation not found" });
    }

    const corretLikes = creation.likes;

    const userIdStr  = userId.toString();

    let updatedLikes;
    let message;

    if(corretLikes.includes(userIdStr)){
      updatedLikes = corretLikes.filter(uid => uid !== userIdStr);
      message = "Like removed";
    }else{
      updatedLikes = [...corretLikes, userIdStr];
      message = "Like added";
    }

    const formattedArray = `{${updatedLikes.json(',')}}`

    const creations = await sql`
      UPDATE creations
      SET likes = ${formattedArray}::text[] WHERE id = ${id}
    `;

    res.json({ success: true, message });
  } catch (error) {
    console.error("Get Creations Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

