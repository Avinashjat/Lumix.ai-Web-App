import { FileText, Sparkles, Loader2 } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

function ReviewResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("Please upload a PDF resume");

    setLoading(true);
    try {
      const token = await getToken();

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setResult(data.content);
        toast.success("Resume Reviewed Successfully");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full">

      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex gap-3 items-center">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>

        <p className="font-medium text-sm mt-6">Upload Resume (PDF Only)</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="border border-gray-300 p-2 mt-2 outline-none text-sm w-full rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-8 text-sm rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5" />}
          {loading ? "Analyzing..." : "Review Resume"}
        </button>
      </form>

      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg min-h-96">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Analysis Result</h1>
        </div>

        <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {result ? result : "Upload a resume to see analysis"}
        </div>
      </div>
    </div>
  );
}

export default ReviewResume;
