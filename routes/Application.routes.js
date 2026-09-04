import authenticateToken  from "../middleware/isAuthenticated.js";

import  { applyForJob, getApplicants, getAppliedJobs, updateApplicationStatus } from '../controllers/Application.controller.js';
import { Router } from 'express';
const router = Router();

router.route('/apply/:id').post(authenticateToken, applyForJob);
router.route('/get').get(authenticateToken, getAppliedJobs);
router.route("/:id/applicants").get(authenticateToken, getApplicants);
router.route('/status/:id/update').post(authenticateToken, updateApplicationStatus);

export default router;