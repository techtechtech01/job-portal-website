import { Application } from "../models/Application.model.js";
import { Job } from "../models/Job.model.js";
import { User } from "../models/User.model.js";
//Apply for a job
const applyForJob = async (req, res) => {
    try {
        const userId = req.id; // Assuming you have user authentication and the applicant's ID is available in req.user.id
        const jobId = req.params.id;
        console.log("user id is ", userId)
        console.log("job id is ", jobId)

        if (!jobId) {
            return res.status(400).json({success:false, message: "Job ID is required" });
        }
        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({success:false, message: "Job not found" });
        }
        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });
        if (existingApplication) {
            return res.status(400).json({success:false, message: "You have already applied for this job" });
        }

        const application = new Application({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(application._id);

        await application.save();
        await job.save();
       return res.status(201).json({success:true, message: "Application submitted successfully" });
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
};
// Get all applications for a specific job
const getAppliedJobs = async (req, res) => {
    console.log("req.body from application controller is : ", req.body)
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const applications = await Application.find({ applicant: userId })
            .populate({ path: "job", options: { sort: { createdAt: -1 } } })
            .populate({ path: "applicant", options: { sort: { createdAt: -1 } } })


        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found" });
        }
        return res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    //console.log("job in getApplicants are: ", job)
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("error is:",error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
//update application status
const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role !== "Recruiter") {
            return res.status(403).json({
                message: "Only recruiters can update application status."
            });
        }
        const allowedStatus = [
            "pending",
            "accepted",
            "rejected"
        ];

        if (!allowedStatus.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid Status"
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        await application.populate({path:"job",select: "createdBy"});
        if (!application.job.createdBy.equals(req.id)) {
            return res.status(403).json({
                message: "You are not authorized to update this application."
            });
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            application,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { applyForJob, getAppliedJobs,getApplicants, updateApplicationStatus };