import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveJob } from '@/redux/jobSlice'
import { toast } from '../ui/toast'
const Job1 = ({job}) => {
    const navigate = useNavigate()
      const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
   const dispatch = useDispatch();
 // const { savedJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
 ;

  return (
    
 <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full h-full flex flex-col  hover:shadow-blue-500 transition duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
        {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 shrink-0" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}/>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">Pakistan</p>
        </div>
      </div>

      <div className="flex-1">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
         {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
           {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          Details
        </Button>
        
      </div>
    </div>
  )
}

export default Job1
