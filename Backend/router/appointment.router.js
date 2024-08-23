import express from 'express';
import { adminAuth, patientAuth } from '../middlewares/auth.js';
import { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment } from '../controllers/appointment.controller.js';

const appointmentRouter = express.Router();


appointmentRouter.post('/post', patientAuth, (req, res, next)=>{
    postAppointment(req, res, next);
})

appointmentRouter.get('/appointments', adminAuth, (req, res, next)=>{
    getAllAppointments(req, res, next);
})
appointmentRouter.put('/update/:id', adminAuth, (req, res, next)=>{
    updateAppointmentStatus(req, res, next);
})
appointmentRouter.delete('/delete/:id', adminAuth, (req, res, next)=>{
    deleteAppointment(req, res, next);
})

export default appointmentRouter;