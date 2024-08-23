// import mongoose from "mongoose";
import { MessageModel } from "../models/message.schema.js";
import ErrorHandler from "../middlewares/error.middleware.js";

export const sendMessage = async(req, res, next) =>{
    const {firstname, lastname, email, phone, message} = req.body;
    console.log(firstname, lastname, email, phone, message)
    if(!firstname || !lastname || !email || !phone || !message){
        return next(new ErrorHandler("Please fill all the details" , 400));
    }

    try{
        await MessageModel.create({firstname, lastname, email, phone, message})
        return res.status(200).json({
            success:true,
            message: "Message sent successfully"
        })
    }catch(error){
        console.log("error")
        console.log(error);
        return next(new ErrorHandler(Object.values(error.errors), 500));
    }
}

export const getAllMessages = async (req, res, next) =>{
    try{
        const messages = await MessageModel.find();
        res.status(200).json({
            success:true,
            messages
        })

    }catch(error){
        console.log("error")
        console.log(error);
        return next(new ErrorHandler(Object.values(error.errors), 500));
    }
}