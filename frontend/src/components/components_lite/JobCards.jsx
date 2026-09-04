import React from 'react'
import { Badge } from '../ui/Badge';
import { useNavigate } from 'react-router-dom';
const JobCards = ({job}) => {
 
    const navigate = useNavigate()
    return (
        
        <div  onClick={()=>navigate(`/description/${job?._id}`)}  >
            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-blue-500 transition duration-300 cursor-pointer">
              <div className=" items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">{job?.company?.name || "Company Name"}</h3>
                <p className="text-gray-500 text-sm">{job?.country}</p>
              </div>
              <div>
                <h5 className="text-gray-600 mb-2">{job?.title}</h5>
                <p className="text-gray-600 mb-2">{job?.description}</p>
                </div>
                <div className="flex w-full flex-wrap gap-2 items-center mt-4">
                    <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>{job?.position}</Badge>
                    <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>{job?.salary}</Badge>
                    <Badge className={" text-[#6B3AC2]  font-bold"} variant={"ghost"}>{job?.location}</Badge>
                    <Badge className={" text-black font-bold"} variant={"ghost"}>{job?.jobType}</Badge>
                
                </div>
               
            </div>

        </div>
    )
}

export default JobCards
