
import { React, useEffect, useState } from 'react'
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT, USER_API_ENDPOINT } from '@/utils/data';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from "react-redux";
import { toast } from '../ui/toast';


const Description = () => {
  const params = useParams()
 
  const jobId = params.id
  const { singleJob } = useSelector((store) => store.jobs);
 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);
  
  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const applyJobHandler = async () => {
    if (!user) {
      const errorMessage = error.response
            ? error.response.data.message
            : "Please Login first!!";
          toast.add({
            type: "error",
            description: errorMessage,
            priority: "high",
          })
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
       {}, { withCredentials: true }
      );
     
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
       
        //toast.success(res.data.message);
          toast.add({
            type: "success",
            description: res.data.message,
            priority: "high",
          })
      }
    } catch (error) {
      console.log("error is :",error.message);
     //toast.error(error.response.data.message)
      const errorMessage = error.response.data.message|| "An error occured";
       toast.add({
            type: "error",
            description: errorMessage,
            priority: "high",
          })
    }
  };



  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get/${jobId}`,
          {
            withCredentials: true,
          });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs")
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(
          error.response?.data?.message || "Failed to fetch job details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  //console.log(`single job is : ${singleJob}`)


  if (!singleJob) {
    return <div>Loading...</div>;
  }



  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-8">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 items-center mt-4">
            <Badge className={"text-blue-600 font-bold"} variant={"ghost"}>
              {singleJob?.position} Open Positions
            </Badge>
            <Badge className={"text-[#FA4F09] font-bold"} variant={"ghost"}>
              {singleJob?.salary} LPA
            </Badge>
            <Badge className={"text-[#6B3AC2] font-bold"} variant={"ghost"}>
              {singleJob?.location}
            </Badge>
            <Badge className={"text-black font-bold"} variant={"ghost"}>
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg w-full md:w-auto ${isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#6B3AC2] hover:bg-[#552d9b]"
              }`}
          >
            {isApplied ? "Already Applied" : "Apply"}
          </Button>
        </div>
      </div>
      <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
        {singleJob?.description}      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1 ">
          Role:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            {singleJob?.position} Open Positions
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Location:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            {singleJob?.location}

          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Salary:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Experience:{" "}
          <span className=" pl-4 font-normal text-gray-800">
            {singleJob?.experience}
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Total Applicants:{" "}
          <span className=" pl-4 font-normal text-gray-800">   {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Job Type:
          <span className=" pl-4 font-normal text-gray-800">
            {singleJob?.jobType}

          </span>
        </h1>

      </div>

    </div>
  )
}

export default Description



