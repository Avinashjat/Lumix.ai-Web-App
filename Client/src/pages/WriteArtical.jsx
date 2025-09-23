import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

function WriteArtical() {

  const articleLength = [
    {length: 800, text: 'Short (500-800 words)'},
    {length: 1200, text: 'Short (800-1200 words)'},
    {length: 1600, text: 'Short (1200+ words)'}
  ]

  const [selectedLength , setSelectedLength] =useState(articleLength[0]);

  const [input , setInput] = useState('');

  const onSubmitHandler = async (e) =>{
    e.preventDefault();

  }
  return (
    <div className='flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full '>

      {/* {Left col} */}
      <form onSubmit={onSubmitHandler} action="" className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg '>
        <div className='flex gap-3 items-center'>
          <Sparkles className="w-6 text-[#4A7AFF] "  />
          <h1 className='text-xl font-semibold'> Article Configuration </h1>
        </div>


         <p className='font-medium text-sm mt-6'> Aticle Topic</p>

         <input type="text" onChange={(e)=>setInput(e.target.value)}  value={input} className='border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md' placeholder= "Write Article text here...." />

         <p className='mt-4 text-sm font-medium'> Article Length</p>

         <div className=' mt-3 flex gap-3 flex-wrap sm:max-w-9/11 '>
          {
            articleLength.map((item ,index)=>(
              <span key={index} onClick={()=>{setSelectedLength(item)}} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ?"bg-blue-100 text-blue-700 " : 'text-gray-500 border-gray-300'}`}>{item.text}</span>
            ))
          }
         </div>

           
  
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-10 text-sm rounded-lg cursor-pointer '>
          <Edit className='w-5' />
           Generate article
        </button>

      </form>

        {/* {right col} */}
        <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <Edit className="w-5 h-5 text-[#4A7AFF] "  />
          <h1 className='text-xl font-semibold'> Article Configuration </h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Edit className="w-9 h-9  "  />
            <p>Enter a topic and click “Generate article ” to get started</p>
            
          </div>
</div>
        </div>

    </div>
  )
}

export default WriteArtical
