import mongoose from "mongoose";
import validator from "validator";

export const appointmentSchema = new mongoose.Schema({
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
    appointmentDate:{
        type: String,
        required: [true, "Appointment Date Is Required!"],
    },
    department: {
        type: String,
        required: [true, "Department Name Is Required!"],
      },
      doctor: {
        firstname: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
        lastname: {
          type: String,
          required: [true, "Doctor Name Is Required!"],
        },
      },
      hasVisited: {
        type: Boolean,
        default: false,
      },
      address: {
        type: String,
        required: [true, "Address Is Required!"],
      },
      doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Doctor Id Is Invalid!"]
      },
      patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient Id Is Required!"],
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      }
})

export const AppointmentModel = mongoose.model('Appointment', appointmentSchema);