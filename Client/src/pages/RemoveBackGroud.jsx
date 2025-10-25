import { Eraser, Sparkles, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

function RemoveBackGroud() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = await getToken();

      const { data } = await axios.post("/api/ai/remove-image-background", 
        formData, 
         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (data.success) {
        setProcessedImage(data.content);
        toast.success("Background Remove successfully!");
      } else {
        toast.error(data.message || "Failed to generate titles. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full'>

      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg'
      >
        <div className='flex gap-3 items-center'>
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>

        <p className='font-medium text-sm mt-6'>Upload Image</p>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          className='border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md'
        />
        <p className='text-gray-500 pt-0 mt-0 text-xs'>Supports JPG, PNG, and other image formats</p>

        <button
          type="submit"
          disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-10 text-sm rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-70'
        >
          {loading ? <Loader2 className='w-5 h-5 animate-spin' /> : <Eraser className='w-5' />}
          {loading ? "Processing..." : "Remove Background"}
        </button>
      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          {processedImage ? (
            <img src={processedImage} alt="Processed" className="max-h-[500px] object-contain" />
          ) : (
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Eraser className="w-9 h-9" />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RemoveBackGroud;
