import Router from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {registerUser, loginUser,logoutUser,profileDetails,updateProfile}  from "../controllers/User.controller.js";
const router = Router();
router.route('/register').post(singleUpload, registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(authenticateToken, profileDetails);
router.route('/profile/update').post(authenticateToken,singleUpload,updateProfile);

export default router;