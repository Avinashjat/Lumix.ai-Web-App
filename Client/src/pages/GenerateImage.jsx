import { ImageIcon, ImagesIcon, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Image } from "react-bootstrap";

function GenerateImage() {
  const ImageTitles = [
    { length: 800, text: "Realistic style" },
    { length: 1200, text: "Ghibli style" },
    { length: 1600, text: "Anime style" },
    { length: 800, text: "cartoon style" },
    { length: 1200, text: "Modern art" },
    { length: 1600, text: "3D style" },
    { length: 1600, text: "Portrait style" },
    { length: 1600, text: "Fantasy style" },
    { length: 1600, text: "Surreal style" },
  ];

  const [selectedLength, setSelectedLength] = useState(ImageTitles[0]);

  const [input, setInput] = useState("");
    const [enabled, setEnabled] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full ">
      {/* {Left col} */}
      <form
        onSubmit={onSubmitHandler}
        action=""
        className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg "
      >
        <div className="flex gap-3 items-center">
          <Sparkles className="w-6  text-[#00AD25]" />
          <h1 className="text-xl font-semibold"> AI Image Generator </h1>
        </div>

        <p className="font-medium text-sm mt-6"> Describe Your Image </p>

        <textarea
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="border border-gray-300 p-2 px-3 h-24 mt-2 outline-none text-sm w-full rounded-md"
          placeholder="Write blog text here...."/>

        <p className="mt-4 text-sm font-medium"> Style </p>

        <div className="mt-3 text-center grid grid-cols-2 sm:grid-cols-3 gap-3 flex-wrap max-w-[450px] md:max-w-9/10">
          {ImageTitles.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                setSelectedLength(item);
              }}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.text === item.text
                  ? "bg-green-100 text-green-700 "
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <label className="flex items-center mt-6 space-x-3 cursor-pointer">
     
      <input  type="checkbox"  checked={enabled}  onChange={() => setEnabled(!enabled)} className="sr-only"/>

      <div  className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${enabled ? "bg-[#43b665]" : "bg-gray-300"}`}>
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-4" : "translate-x-0" }`} ></div>
      </div>
      <span className="text-gray-800 text-sm">Make this image Public</span>
    </label>

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-8 text-sm rounded-lg cursor-pointer ">
          <ImageIcon className="w-5" />
          Generate Title
        </button>
      </form>

      {/* {right col} */}
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-[#00AD25] " />
          <h1 className="text-xl font-semibold">Generated image </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <ImageIcon className="w-9 h-9  " />
            <p> Enter a topic and click “Generate image ” to get started </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateImage;
