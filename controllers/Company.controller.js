import { Company } from '../models/Company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

const createCompany = async (req, res) => {
    try {
        const { companyName, description, website, industry, location, logo } = req.body;
        console.log("Comapany name is:", companyName)
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required",
                success:false,

             });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {

             return res.status(409).json({ message: "Company already exists" ,
                 success:false
            });
        }

        company = await Company.create({
            name: companyName,
            description,
            website,
            industry,
            location,
            logo,
            userId: req.id,

        });
        res.status(201).json({
            message: "Company created successfully",
            success:true,
           company
        });
    } catch (error) {
        res.status(500).json({ message: error, success:false });
    }
}
const getAllCompanies = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if(!companies){
            return res.status(404).json({ message: "No companies found", success:false });
        }
        console.log(userId.Company);
        res.status(200).json({
            message: "Companies retrieved successfully",
                      success:true,

           companies
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success:false });
    }
}
const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        
     
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found", success:false });
        }
        // if (!company.userId.equals(req.id)) {
        //     return res.status(403).json({ message: "You are not authorized to view this company" });
        // }
        res.status(200).json({
            message: "Company retrieved successfully",
               success:true,
            data: company
        });
    } catch (error) {
        res.status(500).json({ error: error.message, success:false });
    }
}
const updateCompany = async (req, res) => {
    try {
        const { name, description, website, industry, location } = req.body;
        const file = req.file
        const fileUri = getDataUri(file);
     const cloudResponse = await cloudinary.uploader.upload(fileUri.content) 
    const logo = cloudResponse.secure_url;
    
        let company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        if (!company.userId.equals(req.id)) {
            return res.status(403).json({ message: "You are not authorized to update this company", success:false });
        }
        if (
            website !== undefined &&
            !/^https?:\/\/[^\s]+$/.test(website)
        ) {
            return res.status(400).json({
                message: "Invalid Website", success:false
            });
        }
        const allowedFields = [
            "name",
            "description",
            "website",
            "industry",
            "location",
            "logo"
        ];

       const updateData = { name, description, website, location, logo };

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        company.set(updateData);
        await company.save();
        return res.status(200).json({
            message: "Company updated successfully",
           success:true,
            data: company
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success:false});
    }
}
export { createCompany, getAllCompanies, getCompanyById, updateCompany };