import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role,phone } = req.body;

    //validate input fields
    if (!fullName || !email || !password || !role || !phone ) {
      return res.status(400).json({ success: false,
        message: "All fields are required" });
    }
    const file= req.file;
    if (!file) {
    return res.status(400).json({
        success: false,
        message: "Please upload a profile picture.",
    });


}
    const fileUri = getDataUri(file);
     const cloudResponse = await cloudinary.uploader.upload(fileUri.content) 
    const profilePhoto = cloudResponse.secure_url;
     
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role, 
      phone,
      profile: {profilePhoto: profilePhoto || ""}
    });
    res.status(201).json({
      message: "User registered successfully",
      success: true
    });
  } catch (error) {
    res.status(400).json({ success: false, message:error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // validate input fields
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    //check role correctly or not
    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    //generate token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
   
    
    res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
    }).json({
      message: `Welcome back, ${user.fullName}!`,
      user,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true , message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false,error: error.message });
  }
};

const profileDetails = async (req, res) => {
  try {
    const userID = req.id; // Assuming the user ID is stored in req.id by the authentication middleware
    let user = await User.findById(userID).select("-password"); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profilePicture: user.profilePicture,
      bio: user.bio,
      skills: user.skills
    };
    return res.status(200).json({
      message: "Your profile details",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, profilePicture, bio, skills ,resume} = req.body;
    console.log(fullName, phone, profilePicture, bio, skills,resume);
    const userID = req.id; // Assuming the user ID is stored in req.id by the authentication middleware
    const user = await User.findById(userID).select("-password"); // Exclude password from the result
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let skillsArray;
    if (skills !== undefined) {
      skillsArray = skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0);
    }
    // Update user profile
    if (fullName !== undefined) {
      user.fullName = fullName;
    }
    if (phone !== undefined) {
      user.phone = phone;
    }
    if (bio !== undefined) {
      user.profile.bio = bio;
    }
    if (skills !== undefined) {
      user.profile.skills = skillsArray;
    }
    if (profilePicture !== undefined) {
      user.profile.profilePhoto = profilePicture;
    } 
if (resume !== undefined) {
      user.profile.resume = resume;
    }
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export { registerUser, loginUser, logoutUser, profileDetails, updateProfile };