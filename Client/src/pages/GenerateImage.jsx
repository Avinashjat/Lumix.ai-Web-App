import { ImageIcon, Sparkles , Loader2 } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function GenerateImage() {
  const styles = [
    "Realistic",
    "Ghibli",
    "Anime",
    "Cartoon",
    "Modern art",
    "3D",
    "Portrait",
    "Fantasy",
    "Surreal",
  ];

  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [input, setInput] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return alert("Please enter a prompt");

    setLoading(true);
    try {
      const token = await getToken();

      const prompt = `Generate a ${selectedStyle} style image for the following description: ${input}`;
      
      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          publish: enabled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setGeneratedImage(data.content);
        toast.success("Image generate successfully!");
      } else {
        toast.error("Failed to generate titles. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg"
      >
        <div className="flex gap-3 items-center">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="font-medium text-sm mt-6">Describe Your Image</p>
        <textarea
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border border-gray-300 p-2 px-3 h-24 mt-2 outline-none text-sm w-full rounded-md"
          placeholder="Write image prompt here..."
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 text-center grid grid-cols-2 sm:grid-cols-3 gap-3 flex-wrap max-w-[450px] md:max-w-9/10">
          {styles.map((style, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(style)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === style
                  ? "bg-green-100 text-green-700"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {style}
            </span>
          ))}
        </div>

        <label className="flex items-center mt-6 space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            className="sr-only"
          />
          <div
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              enabled ? "bg-[#43b665]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                enabled ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="text-gray-800 text-sm">Make this image Public</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-8 text-sm rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ImageIcon className="w-5" />
          )}
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          {generatedImage ? (
            <img
              src={generatedImage}
              alt="Generated"
              className="max-h-[500px] object-contain"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <ImageIcon className="w-9 h-9" />
              <p>Enter a topic and click “Generate Image” to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateImage;
