import React, { useState } from "react";
import { Hash, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function BlogTitle() {
  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
    "Sport",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [input, setInput] = useState("");
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a keyword first.");
      return;
    }

    try {
      setLoading(true);
      setGeneratedTitles([]);

      const token = await getToken();
      const response = await axios.post(
        "/api/ai/generate-blog-title",
        {
          keyword: input,
          category: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGeneratedTitles(response.data?.titles || []);
      toast.success("Titles generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-auto h-full bg-gray-50">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
      >
        <div className="flex gap-3 items-center">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-xl font-semibold">AI Blog Title Generator</h1>
        </div>

        <label className="block mt-6 text-sm font-medium text-gray-700">
          Keyword
        </label>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md focus:ring-2 focus:ring-purple-500"
          placeholder="Write blog topic here..."
        />

        <label className="block mt-4 text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat, index) => (
            <span
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-purple-100 text-purple-700 border-purple-300"
                  : "text-gray-500 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-8 text-sm rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Hash className="w-5 h-5" />
          )}
          {loading ? "Generating..." : "Generate Titles"}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-xl p-5 bg-white border border-gray-200 rounded-xl shadow-sm min-h-96 max-h-[600px] overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <Hash className="w-5 h-5 text-purple-700" />
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        {generatedTitles.length > 0 ? (
          <ul className="space-y-3">
            {generatedTitles.map((title, index) => (
              <li
                key={index}
                className="p-3 border border-gray-200 rounded-md text-sm bg-gray-50 hover:bg-gray-100"
              >
                {title}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm mt-10">
            <Hash className="w-9 h-9 mb-3" />
            <p>Enter a topic and click “Generate Titles” to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogTitle;
