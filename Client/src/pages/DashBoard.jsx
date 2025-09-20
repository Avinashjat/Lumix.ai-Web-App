import React from 'react'
import { useEffect ,useState } from 'react';
import { dummyCreationData } from '../assets/assets';
import {  Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import Creation from '../components/Creation';


function DashBoard() {
const [creation , setCreation] = useState([]);

  const getDUmmyData = async () => {
    setCreation(dummyCreationData);
  }

  useEffect(()=>{
    getDUmmyData();
  },[])

  return (
    <div className='h-full p-6 overflow-y-scroll  '>
          <div className='flex flex-wrap gap-4 justify-start'>
        {/* total Creation card */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm '>
          <div className='text-slate-600'>
              <p className='text-sm '>Total Creation  </p>
              <h2 className='text-xl font-semibold'>{creation.length}</h2>
          </div>
          <div className='w-10 h-10 bg-gradient-to-tr from-[#3588F2] to-[#0BB0D7] rounded-lg text-white flex justify-center items-center'>
              <Sparkles className='w-5 text-white' />
          </div>
        </div>
          
          {/* plan card */}

         <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm '>
          <div className='text-slate-600'>
              <p className='text-sm '>Active Plan   </p>
              <h2 className='text-lg font-semibold'>
                <Protect plan='premium' fallback='Free' >Preminum </Protect>
                </h2>
          </div>
          <div className='w-10 h-10 bg-gradient-to-tr from-[#FF61C5] to-[#9E53EE] rounded-lg text-white flex justify-center items-center'>
           
              <Gem className='w-5 text-white' />
          </div>
        </div> 
          </div>

          <div className='space-y-3'>
            <p className=' mb-3 py-3 mt-3'>Recent Creations </p>
            {
              creation.map((item )=><Creation key={item.id} item={item} />)
              }
          </div>


    </div>
  )
}

export default DashBoard
