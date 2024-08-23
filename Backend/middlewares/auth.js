import ErrorHandler from "./error.middleware.js";
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.schema.js";

export const adminAuth = async (req, res, next) =>{
    console.log("admin Auth");
    try{
        const token = req.cookies.adminToken;
        console.log(token);
        if(!token){
            return next(new ErrorHandler("Unauthorized", 400))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await UserModel.findById(decoded.id);
        if(!req.user || req.user.role !== "Admin"){
            return next(new ErrorHandler("Unauthorized", 403))
        }
        next();
    }catch(error){
        next(error);
    }
}

export const patientAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.patientToken;
        console.log(token);
    
        if(!token){
            return next(new ErrorHandler("User not logged in", 400))
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await UserModel.findById(decoded.id);
        if(!req.user || req.user.role !== "Patient"){
            return next(new ErrorHandler("Unauthorized", 403))
        }
        next();
    }catch(error){
        next(error);
    }
}

