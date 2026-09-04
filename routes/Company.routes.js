import authenticateToken from "../middleware/isAuthenticated.js";

import {createCompany, getAllCompanies, getCompanyById, updateCompany} from '../controllers/Company.controller.js';
import { Router } from 'express';
import { singleUpload } from "../middleware/multer.js";
const router = Router();

router.route('/createCompany').post(authenticateToken, createCompany);
router.route('/getAllCompanies').get(authenticateToken, getAllCompanies);
router.route('/getCompanyById/:id').get(authenticateToken, getCompanyById);
router.route('/updateCompany/:id').put(authenticateToken, singleUpload, updateCompany);

export default router;