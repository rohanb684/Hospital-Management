import ErrorHandler from "../middlewares/error.middleware.js";
import { UserModel } from "../models/user.schema.js";
import { generateToken } from "../utils/jwtToken.js";

import cloudinary from 'cloudinary';

export const registerPatient = async (req, res, next) => {
    const { firstname, lastname, email, phone, dob, gender, password } = req.body;
    console.log(req.body);

    if (!firstname || !lastname || !email || !phone ||  !dob || !gender || !password) {
        return next(new ErrorHandler("Please fill complete form", 400));
    }

    try {
        const isRegistered = await UserModel.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler("User already registered", 400));
        }
        
        await UserModel.create({ firstname, lastname, email, phone,  dob, gender, password, role: "Patient" });

        generateToken(user, "User registered successfully", 201, res )

    } catch (error) {
        next(error);
    }
}

export const loginUser = async(req, res, next) =>{
    const {email, password, confirmPassword, role} = req.body;
    console.log(req.body);

    if(!email || !password || !confirmPassword || !role){
        console.log("empty details")
        return next(new ErrorHandler("Fill all details", 400))
    }
    try{
        if(password !== confirmPassword){
            return next(new ErrorHandler("Password and confirm password doesn't match", 400))
        }
        
        const user = await UserModel.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid email or password", 400))
        }

        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password", 400))
        }

        if(role !== user.role){
            return next(new ErrorHandler(`User Not Found With This Role!`, 400));
        }

        generateToken(user, "User Logged In successfully", 200, res )

    }catch(error){
        next(error);
    }
}


export const registerAdmin = async (req, res, next) =>{
    const { firstname, lastname, email, phone,  dob, gender, password } = req.body;

    if (!firstname || !lastname || !email || !phone ||  !dob || !gender || !password) {
        return next(new ErrorHandler("Please fill complete form", 400));
    }

    try{
        const isRegistered = await UserModel.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler("User already registered", 400));
        }

        const admin = await UserModel.create({
            firstname, lastname, email, phone,  dob, gender, password, role: "Admin"
        })

        res.status(200).json({
            success: true,
            message: "Admin registered successfully",
            admin,
          });

    }catch(error){
        next(error);
    }
}


export const getAllDoctors = async(req, res, next)=>{
    try{
        const doctors = await UserModel.find({role:"Doctor"})
        res.status(200).json({
            success: true,
            doctors
          });
    }catch(error){
        next(error);
    }
} 

export const getUser = async(req, res, next)=>{
    const user = req.user;
    console.log(user);
    res.status(200).json({
        success:true,
        user
    })
}

export const adminLogout = async(req, res, next) =>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message:"User logged out successfuly"
    })
}

export const patientLogout = async(req, res, next) =>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message:"User logged out successfuly"
    })
}

export const registerDoctor = async(req, res, next)=>{
    try{
        console.log("inside register doc")
        if(!req.files || Object.keys(req.files).length === 0){
            return next(new ErrorHandler("Avtaar Required", 400))
        }
        const {avatar}= req.files;
        console.log("req.files completed")
        const imgFormat = ["image/png", "image/jpeg", "image/webp"];
        if(!imgFormat.includes(avatar.mimetype)){
            return next(new ErrorHandler("Avatar file format not supported!", 400));
        }
        console.log("img format completed")
        const { firstname, lastname, email, phone,  dob, gender, password, doctorDepartment } = req.body;

        if (!firstname || !lastname || !email || !phone || !dob || !gender || !password || !doctorDepartment) {
            return next(new ErrorHandler("Please fill complete form", 400));
        }

        const isRegistered = await UserModel.findOne({ email });
        if (isRegistered) {
            return next(new ErrorHandler("Doctor already registered", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            avatar.tempFilePath
        );
        console.log(cloudinaryResponse)
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error(
                "Cloudinary Error:",
                cloudinaryResponse.error || "Unknown Cloudinary error"
              );
              return next(
                new ErrorHandler("Failed To Upload Avatar To Cloudinary", 500)
              );
        }
        console.log("cloudinaryResponse completed")

        const doctor = await UserModel.create({
            firstname, lastname, email, phone, dob, gender, password, doctorDepartment,
            role:"Doctor", avatar:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        });

        res.status(201).json({
            success:true,
            message:"Doctor registered successfully",
            doctor
        })

    }catch(error){
        next(error);
    }
}