import React ,{useState} from 'react'
import { Outlet , useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import {X, Menu} from 'lucide-react'
import Sidebar from '../components/Sidebar';
import {SignIn, useUser } from '@clerk/clerk-react';

function Layout() {
  const navigate = useNavigate();

  const [sidebar , setSidebar] = useState(false);
  const {user}= useUser();

  return user ? (
    <div className='h-screen flex flex-col justify-start items-start'>

      <nav className='w-full h-16  px-10  flex justify-between border-b border-gray-200'>
        <img className='cursor-pointer' src={assets.logo} alt="Logo" onClick={()=>navigate('/')}  />
        {
          sidebar ? <X className=' w-7 h-7 mt-5 text-gray-600 sm:hidden' onClick={()=>setSidebar(false)} />
           : <Menu className='w-7 h-7 mt-5  text-gray-600 sm:hidden' onClick={()=>setSidebar(true)} />

        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className=' flex-1 h-full bg-gray-100 overflow-y-auto'>
             <Outlet />

        </div>

      </div>
 
   
    </div>
  ) :(
    <div className='h-screen flex justify-center items-center'>
      <SignIn />

    </div>
  )
}

export default Layout
