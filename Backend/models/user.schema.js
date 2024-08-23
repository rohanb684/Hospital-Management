import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:[3, "First name must contain atleast 3 characters"]
    },
    lastname:{
        type:String,
        required:true,
        minLength:[3, "Last name must contain atleast 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, "Please Provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10, "Phone number should be of 10 digits"],
        maxLength:[10, "Phone number should be of 10 digits"]
    },
    dob:{
        type: Date,
        require: [true, "DOB is required"]
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    password:{
        type: String,
        minLength: [5, "Password must contain 5 characters"],
        required:true,
        select: false
    },
    role:{
        type:String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment:{
        type:String,
    },
    avatar:{
        public_id: String,
        url: String
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const UserModel = mongoose.model('User', userSchema);