import React from 'react'
import { PricingTable } from '@clerk/clerk-react'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Plan() {
  return (
    <div className='max-w-2xl mx-auto z-20 py-24 '>
        <motion.div className='text-center mb-30 '
        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}>
            <h2 className='text-slate-700 text-[45px] font-semibold '>Choose Your Plan</h2>
            <p className='text-gray-600 max-w-lg mx-auto '>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
        </motion.div>

        <motion.div className='mt-14 max-sm:mx-8 bg'
         initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}>
            <PricingTable /> 
        </motion.div>
    </div>
  )
}

 export default Plan









