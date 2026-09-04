import React, { useState } from 'react'
import { PiBuildingOfficeBold } from "react-icons/pi";
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';

const Header = () => {
const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className= 'my-5'>
        <div className='flex flex-col items-center justify-center '>
     <h2 className='font-medium text-gray-600 flex  gap-1 items-center text-lg'>
        <span className='text-blue-500'><PiBuildingOfficeBold /></span>
        No.1 Job hunt platform
        </h2>
      <h2 className='text-5xl font-bold text-gray-800 '>Find your dream <span className='text-blue-500'>Job</span> today!</h2>
    </div>
    <div className='flex  text-center items-center justify-center mt-4'>
        <p className='items-center justify-center text-gray-600 text-lg'>
             Start your hunt for the best, life-changing career opportunities 
            from here in your<br /> selected areas conveniently and get hired quickly.
        </p>
    </div>
    <div className='flex w-full sm:w-[85%] md:w-[65%] lg:w-[50%] shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white rounded-full items-center p-2 mx-auto mt-8 border border-gray-100 transition-all hover:shadow-2xl'>
      <Input 
      className='outline-none border-none w-full py-3 px-6 bg-transparent text-gray-800 text-base md:text-lg
       placeholder:text-gray-400 ' 
       onChange={(e) => setQuery(e.target.value)}
       onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchjobHandler();
                }
              }}
       type='search' 
       placeholder='Search for jobs, companies...' />
          <Button
              onClick={searchjobHandler} 
              className="rounded-full bg-[#6B3AC2] hover:bg-[#5b30a6] h-12 w-12 md:w-32 flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              <Search className="h-5 w-5" />
              <span className="hidden md:block font-semibold">Search</span>
            </Button>
    </div>
    </div>
  )
}

export default Header
