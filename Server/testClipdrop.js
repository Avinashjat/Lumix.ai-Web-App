import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config(); // load .env

async function testClipdrop() {
  const formData = new FormData();
  formData.append("prompt", "A cute cat");

  try {
    const res = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.IMAGE_API_KEY,
        },
        responseType: "arraybuffer",
      },
    );

    console.log("Status:", res.status);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

testClipdrop();
