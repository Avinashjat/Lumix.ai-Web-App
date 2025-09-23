import {  Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'


function BlogTitle() {

  const BlogTitles = [
    {length: 800, text: 'General'},
    {length: 1200, text: 'Technology'},
    {length: 1600, text: 'Bussiness'},
    {length: 800, text: 'Health'},
    {length: 1200, text: 'Lifestyle'},
    {length: 1600, text: 'Education'},
    {length: 1600, text: 'Travel'},
    {length: 1600, text: 'Food'},
    {length: 1600, text: 'Sport'},

  ]

  const [selectedLength , setSelectedLength] =useState(BlogTitles[0]);

  const [input , setInput] = useState('');

  const onSubmitHandler = async (e) =>{
    e.preventDefault();

  }
  return (
    <div className='flex flex-wrap items-start gap-4 p-6 text-slate-700 overflow-y-scroll h-full '>

      {/* {Left col} */}
      <form onSubmit={onSubmitHandler} action="" className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg '>
        <div className='flex gap-3 items-center'>
          <Sparkles className="w-6  text-purple-600 "  />
          <h1 className='text-xl font-semibold'> AI Title Generator </h1>
        </div>


         <p className='font-medium text-sm mt-6'> Keyword</p>

         <input type="text" onChange={(e)=>setInput(e.target.value)}  value={input} className='border border-gray-300 p-2 px-3 mt-2 outline-none text-sm w-full rounded-md' placeholder= "Write blog text here...." />

         <p className='mt-4 text-sm font-medium'> Category</p>

         <div className='mt-3 text-center grid grid-cols-2 sm:grid-cols-3 gap-3 flex-wrap max-w-[450px] md:max-w-9/10'>
          {
            BlogTitles.map((item ,index)=>(
              <span key={index} onClick={()=>{setSelectedLength(item)}} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ?"bg-purple-100 text-purple-700 " : 'text-gray-500 border-gray-300'}`}>{item.text}</span>
            ))
          }
         </div>

           
  
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB]  text-white px-4 py-2 mt-11 text-sm rounded-lg cursor-pointer '>
          <Hash className='w-5' />
           Generate Title
        </button>

      </form>

        {/* {right col} */}
        <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg flex flex-col min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <Hash className="w-5 h-5 text-purple-700 "  />
          <h1 className='text-xl font-semibold'> Generated titles</h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Hash className="w-9 h-9  "  />
            <p>Enter a topic and click “Generated title” to get started</p>
            
          </div>
</div>
        </div>

    </div>
  )
}
export default BlogTitle
