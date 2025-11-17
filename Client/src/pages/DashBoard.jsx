import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import Creation from '../components/Creation';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function DashBoard() {
  const { getToken } = useAuth();
  const [creations, setCreations] = useState([]);

  const getUserCreationData = async () => {
    try {
     const token = await getToken();

      const response = await axios.get("http://localhost:6467/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setCreations(response.data.creations);
      }
    } catch (error) {
      console.log("Error fetching creations:", error);
    }
  };

  useEffect(() => {
    getUserCreationData();
  }, []);

  return (
    <div className='h-full p-6 overflow-y-scroll'>
      <div className='flex flex-wrap gap-4 justify-start'>

        {/* Total Creations */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 bg-gradient-to-tr from-[#3588F2] to-[#0BB0D7] rounded-lg flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* Active Plan */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm'>
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-lg font-semibold'>
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className='w-10 h-10 bg-gradient-to-tr from-[#FF61C5] to-[#9E53EE] rounded-lg flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>

      </div>

      <div className='space-y-3'>
        <p className='mb-3 py-3 mt-3 font-medium'>Recent Creations</p>
        {creations.length > 0 ? (
          creations.map(item => <Creation key={item.id} item={item} />)
        ) : (
          <p className='text-gray-500 text-sm'>No creations available.</p>
        )}
      </div>

    </div>
  );
}

export default DashBoard;
