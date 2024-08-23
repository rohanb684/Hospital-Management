import { AppointmentModel } from "../models/appointment.schema.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { UserModel } from "../models/user.schema.js";

export const postAppointment = async(req, res, next) =>{
    const {
        firstname, lastname, email, phone,  dob, gender,
        appointmentDate, department, doctorFirstname,
         doctorLastname, address
        } =  req.body;

        if (
            !firstname || !lastname || !email || !phone ||  !dob || !gender || 
            !appointmentDate || !department || !doctorFirstname || !doctorLastname || !address
        ) {
            return next(new ErrorHandler("Please fill complete form", 400));
        }
        

        try{
            const isDuplicateDoctor = await UserModel.find({
               firstname: doctorFirstname,
               lastname: doctorLastname,
               role: "Doctor",
               doctorDepartment: department
            })

            // console.log(isDuplicateDoctor);  

            if(isDuplicateDoctor.length === 0){
                return next(new ErrorHandler("Doctor not found", 404))
            }

            if(isDuplicateDoctor.length > 1){
                return next(new ErrorHandler("Doctors with same name exist, please contact the hospital on email or phone", 400))
            }

            const doctorId = isDuplicateDoctor[0]._id;
            const patientId = req.user._id;

            const newAppointment = await AppointmentModel.create({
                firstname, lastname, email, phone,  dob, gender,
                appointmentDate, department, 
                doctor:{firstname: doctorFirstname, lastname: doctorLastname}, address, doctorId, patientId
            })

            res.status(201).json({
                success:true,
                message:"New Appointment Created",
                newAppointment
            })

        }catch (error) {
            next(error);
        }
}

export const getAllAppointments = async(req, res, next) =>{
    try{
        const appointments = await AppointmentModel.find({})
        res.status(200).json({
            success:true,
            appointments
        })
    }catch (error) {
        next(error);
    }
}

export const updateAppointmentStatus = async(req, res, next) =>{
    const appointmentId = req.params.id;

    try{
        const appointment = await AppointmentModel.findById(appointmentId)
        if(!appointment){
            return next(new ErrorHandler("Appointment not found", 404))
        }

        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, req.body, {
            new:true,
            runValidators:true, 
            useFindAndModify:false
        })

        res.status(200).json({
            success:true,
            message:"Appointment Status updated",
            updatedAppointment
        })

    }catch (error) {
        next(error);
    }
}

export const deleteAppointment = async (req, res, next) =>{
    const appointmentId = req.params.id;

    try{
        const appointment = await AppointmentModel.findById(appointmentId)
        if(!appointment){
            return next(new ErrorHandler("Appointment not found", 404))
        }

        await appointment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Appointment Deleted Successfully!",
          });

    }catch (error) {
        next(error);
    }

}