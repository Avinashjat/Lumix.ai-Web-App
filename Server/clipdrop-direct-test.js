import axios from "axios";

const KEY =
  "6451d140084d4d13a38f010c56f7693fa113470042df8ab019fc71eb359dd45cb8c95e0f68ef346e172b25de2a58a20d";

async function test() {
  try {
    const res = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      { prompt: "a small red car" },
      {
        headers: {
          "x-api-key": KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      },
    );

    console.log("SUCCESS: image bytes =", res.data.length);
  } catch (e) {
    console.log("ERROR:", e.response?.data?.toString() || e.message);
  }
}

test();
