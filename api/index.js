import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routers/auth.js";
import usersRouter from "./routers/users.js";
import hotelsRouter from "./routers/hotels.js";
import roomsRouter from "./routers/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
//const express = require("express");
const app = express();
dotenv.config();
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.");
      } catch (error) {
       throw error;
      }
};
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

//Error handling 
app.use((err,req,res,next)=>{
    const errStatus=err.status || 500;
    const errMessage=err.message || "Something went wrong";
   return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack,
   });
});
mongoose.connection.on("disconnected",()=>{
    console.log("Mongo disconnected");
});
mongoose.connection.on("connected",()=>{
    console.log("Mongo connected");
});
app.listen(8800, ()=>{
    connect();
    console.log("Connected to backend");
});
