import { Job } from '../models/Job.model.js';
import { Company } from '../models/Company.model.js';
const createJob = async (req, res) => {
   // console.log(" req.body in createJob is : ", req.body)

  try {
    const { title, description, requirements, jobType, position, location, salary,experience,companyId} = req.body;
    //console.log(title, description, requirements, jobType, position, location, salary,experience,companyId)
    // if (!title || !description  || !country|| !requirements || !jobType || !position || !location || !salary || !experience || !companyId) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    if (isNaN(Number(salary))) {
      return res.status(400).json({
         success: false,
        message: "Invalid salary"
      });
    }
    if (salary<= 0) {
    return res.status(400).json({
        success: false,
        message: "Salary must be greater than 0."
    });
}
    const userId = req.id; // Assuming you have user authentication and the user ID is available in req.user
   // const existingCompany = await Company.findOne({ name: companyId });

    // if (!existingCompany) {
    //   return res.status(404).json({
    //      success: false,
    //     message: "Company not found"
    //   });
    // }

    // if (!existingCompany.userId.equals(req.id)) {
    //   return res.status(403).json({
    //      success: false,
    //     message: "Unauthorized"
    //   });
    // }
    const job = await Job.create({
      title, description,company: companyId,
      requirements: requirements.split(',').map((req) => req.trim()).filter(item => item.length > 0),
      jobType, position, location, salary: Number(salary),experience,
      createdBy: userId
    });
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job
    });
  } catch (error) {
    res.status(500).json( 
      { success: false,
     message: error.message} );
  }
}
//get all jobs

const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ]
    };
    const jobs = await Job.find(query)
      .populate({
        path: 'company',
        select: "name logo location"
      }).sort({ createdAt: -1 });
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
     return res.status(200).json({
      success: true,
      message: "All jobs retrieved successfully",
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get jobs by id
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: 'applications', });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(200).json({
      success: true,
      message: "Job retrieved successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//jobs created by admin
const getJobsByAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId }).populate({ path: 'company' }).sort({ createdAt: -1 });
   // console.log("jobs from job.controller.js is : ", jobs)
    res.status(200).json({
      success: true,
      message: "Jobs retrieved by admin successfully",
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createJob, getAllJobs, getJobById, getJobsByAdmin };