import Router from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import { createJob, getAllJobs, getJobById, getJobsByAdmin } from "../controllers/Job.controller.js";
const router = Router();
router.route('/createJob').post(authenticateToken, createJob);
router.route('/get').get(getAllJobs);
router.route('/get/:id').get(authenticateToken, getJobById);
router.route('/getByAdmin').get(authenticateToken, getJobsByAdmin);
export default router;  