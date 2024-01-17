import user from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const register=async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser=new user({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        });
        await newuser.save();
        res.status(200).json("The user has been created.");
    }catch(err){
        next(err);
    }
};

export const login=async(req,res,next)=>{
     try{
        const User= await user.findOne({username:req.body.username});
        if(!User)return next(createError(404,"User not found."));
        const passwordIsCorrect=await bcrypt.compare(req.body.password, User.password);
        if(!passwordIsCorrect)return next(createError(400,"Wrong password."));
        const token = jwt.sign({id:User.id, isAdmin:User.isAdmin},process.env.JWT);
        //Don't show password and isAdmin and otherDetails
        const {password, isAdmin, ...otherDetails}=User._doc;
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({...otherDetails});
    }catch(err){
        next(err);
    } 
};