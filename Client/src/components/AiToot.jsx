import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function AiToot() {
  const {user} = useUser();
  const navigate = useNavigate();
  return (
    
    <div className='px-4 sm:px-20 xl:px-32 my-24 mt-0'>

        <div className='text-center mb-10'>
            <h2 className='text-slate-700 text-[45px] font-semibold '>Powerful AI Tools</h2>
            <p className='text-gray-600 max-w-lg mx-auto '>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.</p>
        </div>

        <div className='flex flex-wrap justify-center  mt-10'>
            { AiToolsData.map((tool, index)=>(
                    <div key={index} onClick={()=> user && navigate(tool.path)} className='p-8 m-4 max-w-xs border border-gray-100 rounded-lg bg-[#FDFDFE] shadow-lg   hover:-translate-y-1 transition-all duration-300 cursor-pointer  flex flex-col gap-4'>
                      <tool.Icon className='w-12 h-11 p-3 text-white rounded-xl ' style={{background:`linear-gradient(to bottom,${tool.bg.from}) ,${tool.bg.to}`}}/>
                      <h3 className='mt-4  mb-1 text-lg  font-semibold'>{tool.title}</h3>
                      <p className='text-gray-500 text-sm  max-w-[95%]'>{tool.description}</p>
                    </div>
                    
                ))}
        </div>


    </div>
  )
}

export default AiToot