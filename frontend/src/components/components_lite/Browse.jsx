import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Job1 from './Job1'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'



const Browse = () => {

   useGetAllJobs();
    const allJobs = useSelector((state) => state.jobs?.allJobs || []); 
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
    <Navbar />
    <div className='flex items-center content-center max-w-7xl mx-auto mt-5 px-4 md:px-8 '>
     <h2 className="font-bold text-xl my-3">  Search Results {allJobs.length}</h2>
      </div>
      <div className='flex-1 h-auto md:h-[88vh] md:overflow-y-auto pb-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
          {allJobs.map((job) => {
            return <Job1 key={job._id} job={job} />;
          })}
  </div>
  </div>
  </div>
  )
}
    
export default Browse
