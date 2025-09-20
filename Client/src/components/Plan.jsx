import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

function Plan() {
  return (
    <div className='max-w-2xl mx-auto z-20 py-24 '>
        <div className='text-center mb-30 '>
            <h2 className='text-slate-700 text-[45px] font-semibold '>Choose Your Plan</h2>
            <p className='text-gray-600 max-w-lg mx-auto '>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
        </div>

        <div className='mt-14 max-sm:mx-8 bg'>
            <PricingTable /> 
        </div>
    </div>
  )
}

export default Plan
