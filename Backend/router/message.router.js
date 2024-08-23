import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import { getAllMessages } from '../controllers/message.controller.js';
import { adminAuth } from '../middlewares/auth.js';

const messageRouter =  express.Router();

messageRouter.post('/send', (req, res, next)=>{
    sendMessage(req, res, next);
})

messageRouter.get('/messages', adminAuth,  (req, res, next)=>{
    getAllMessages(req, res, next)
})

export default messageRouter;