import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useClerk , UserButton , useUser } from '@clerk/clerk-react'
import { motion } from "framer-motion";

function Navbar() {
  const { openSignIn} = useClerk();
  const {user} = useUser();
  const navigate = useNavigate();
  return (

    <div>

        <motion.div className='flex justify-between items-center p-4 fixed top-0 left-0 bg-trasparent z-50 position:sticky w-full backdrop-blur-2xl py-3 px-4  sm:px-20 xl:px-32 ' onClick={ ()=>navigate('/')}
          initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}>

           <img className='w-32 sm:w-44 cursor-pointer' src={assets.logo} alt="logo" />
           {
            user ? <UserButton /> 
            :  (
            <button onClick={openSignIn} className=' flex bg-blue-600 gap-2 rounded-full py-2.5 px-10  text-white cursor-pointer text-sm border-black'>Get Started <ArrowRight className='w-4 h-5'/></button>
            )
           }
         
             
        </motion.div>

    </div>
  )
}

export default Navbar