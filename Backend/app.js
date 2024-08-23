import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import messageRouter from "./router/message.router.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRouter from "./router/user.router.js";
import appointmentRouter from "./router/appointment.router.js";

const app = express();

config({
  path: "./config/config.env",
});

app.use(
  cors({
    origin: [process.env.USER_URL, process.env.ADMIN_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use(errorMiddleware);
export default app;
