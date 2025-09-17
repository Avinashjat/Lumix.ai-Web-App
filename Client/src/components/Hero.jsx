import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Hero() {

  const Navigate = useNavigate();
  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col justify-center w-full  bg-[url(./bg.png)] bg-cover bg-no-repeat min-h-screen ">


      <div className="text-center mt-20 mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl  2xl:text-7xl font-bold  text-center  mb-6 font-semibold  mx-auto leading-[1.2] ">
          Create amazing content <br /> with
          <span className="text-blue-800">AI tools</span> </h1>
        <p className="mt-4  max-w-xs  sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our suite of premium AI
          tools.Write articles, generate images, and enhance your workflow.
        </p>
      </div>



      <div className="flex justify-center gap-4 text-sm max-sm:text-xs ">
        <button onClick={()=> Navigate('/ai')} className="bg-blue-800  rounded-lg text-white cursor-pointer px-10 py-3 hover:scale-105 active:scale-95  transition ">
         
          Start creating now
        </button>
        <button className="bg-white px-10 py-3 border border-gray-300 rounded-lg text-black cursor-pointer hover:scale-105 active:scale-95 transition  ">
         
          Watch demo
        </button>
      </div>

      <div className="flex  600 justify-center items-center gap-4 mt-8  text-gray-">
        <img className=" h-8" src={assets.user_group} alt="" />Trusted by 10k+ people
        
      </div>
    </div>
  );
}

export default Hero;
