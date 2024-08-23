import express from 'express';
import { registerPatient, loginUser , registerAdmin, getAllDoctors, getUser, adminLogout, patientLogout,registerDoctor} from '../controllers/user.controller.js';
import { adminAuth, patientAuth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/patient/register', (req, res, next)=>{
    registerPatient(req, res, next);
})

userRouter.post('/login', (req, res, next)=>{
    loginUser(req, res, next);
})

userRouter.post('/admin/register', adminAuth, (req, res, next)=>{
    registerAdmin(req, res, next)
})

userRouter.get('/doctors', (req, res, next)=>{
    getAllDoctors(req, res, next)
})

userRouter.get('/admin',adminAuth, (req, res, next)=>{
    getUser(req, res, next)
})

userRouter.get('/patient',patientAuth, (req, res, next)=>{
    getUser(req, res, next)
})

userRouter.get('/admin/logout',adminAuth, (req, res, next)=>{
    adminLogout(req, res, next)
})

userRouter.get('/patient/logout',patientAuth, (req, res, next)=>{
    patientLogout(req, res, next)
})

userRouter.post('/doctor/register', adminAuth, (req, res, next)=>{
    registerDoctor(req, res, next)
})
export default userRouter;