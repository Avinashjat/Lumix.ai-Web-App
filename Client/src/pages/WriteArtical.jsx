
import { Edit, Sparkles , Loader2} from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function WriteArtical() {

  const articleLength = [
    { length: 800, text: 'Short (500–800 words)' },
    { length: 1200, text: 'Medium (800–1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}.`;

      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        // ✅ Ensure content is always a clean string
        const cleanContent =
          typeof data.content === 'string'
            ? data.content.trim().replace(/^\uFEFF/, '') // remove BOM if present
            : JSON.stringify(data.content, null, 2);
        setContent(cleanContent);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>

        <p className="font-medium text-sm mt-6">Article Topic</p>

        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md"
          placeholder="Write article topic here..."
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.text === item.text
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-10 text-sm rounded-lg cursor-pointer"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Edit className="w-5" />}
          {loading ? 'Processing...' : 'Generate article'}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p>Enter a topic and click “Generate Article” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-auto text-sm text-slate-600">
            <div className="reset-tw prose max-w-none">
             
              <Markdown>{String(content || '')}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteArtical;

