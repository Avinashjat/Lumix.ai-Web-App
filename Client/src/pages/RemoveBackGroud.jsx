import { Eraser ,Sparkles } from 'lucide-react';
import React ,{useState} from 'react'

function RemoveBackGroud() {

  const [input , setInput] = useState('');
    
  
    const onSubmitHandler = async (e) =>{
      e.preventDefault();
  
    }
    return (
      <div className='flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full '>
  
        {/* {Left col} */}
        <form onSubmit={onSubmitHandler} action="" className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg '>
          <div className='flex gap-3 items-center'>
            <Sparkles className="w-6  text-[#FF4938] "  />
            <h1 className='text-xl font-semibold'> Background Removal </h1>
          </div>
  
  
           <p className='font-medium text-sm mt-6'> Upload image </p>
  
           <input type="file" onChange={(e)=> setInput(e.target.value)} value={input}  className='border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md' placeholder= "Choose File No File Chosen " />
           <p className='text-gray-500 pt-0 mt-0 text-xs'>Supports JPG, PNG, and other image formats</p>
  
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938]  text-white px-4 py-2 mt-10 text-sm rounded-lg cursor-pointer '>
            <Eraser className='w-5' />
             Remove Background
          </button>
  
        </form>
  
          {/* {right col} */}
          <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]'>
  
          <div className='flex items-center gap-3'>
            <Eraser className="w-5 h-5 text-[#FF4938] "  />
            <h1 className='text-xl font-semibold'> Processed Image
 </h1>
          </div>
  
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Eraser className="w-9 h-9  "  />
              <p>Upload an image and click "Remove Background" to get started</p>
              
            </div>
  </div>
          </div>
  
      </div>
    )
  }

export default RemoveBackGroud
