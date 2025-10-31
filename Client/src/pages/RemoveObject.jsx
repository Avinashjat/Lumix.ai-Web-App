import { Scissors, Sparkles, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

function RemoveObject() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select an image!');
    if (!description || description.trim().length === 0)
      return toast.error('Please provide a descriptive object name! (Example: "red apple on left")');

    setLoading(true);

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append('image', file); // key: image
      formData.append('description', description.trim()); // key: description

      
    

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setProcessedImage(data.content);
        toast.success('Object removed successfully!');
      } else {
        toast.error(data.message || 'Failed to remove object');
      }
    } catch (err) {
      console.error('Request error:', err);
      toast.error(err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full">

      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex gap-3 items-center">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="font-medium text-sm mt-6">Upload Image</p>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          accept="image/*"
          className="border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md"
        />
        <p className="text-gray-500 pt-0 mt-0 text-xs">Supports JPG, PNG, WEBP</p>

        <p className="text-gray-700 mt-6 font-medium text-sm">Describe the exact object</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-gray-300 p-2 px-3 h-20 mt-2 outline-none text-sm w-full rounded-md"
          placeholder='Example: "small yellow apple on the left", "red apple near glass"'
        />
        <p className="text-xs text-gray-500 mt-2">
          Tip: include color, size, and position. If not resolved, try simpler: "red apple"
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-8 text-sm rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scissors className="w-5" />}
          {loading ? 'Processing...' : 'Remove Object'}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          {processedImage ? (
            <img src={processedImage} alt="Processed" className="max-h-[500px] object-contain" />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and provide a description to remove a specific object</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default RemoveObject;
