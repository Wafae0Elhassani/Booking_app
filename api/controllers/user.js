import user from "../models/user.js";

export const createUser=async(req,res,next)=>{
    const newUser = new user(req.body);
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        next(err);
    }
}

export const updateUser=async(req,res,next)=>{
    try{
        const updateUser = await user.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updateUser);
    }catch(err){
        next(err);
    }
}

export const deleteUser=async(req,res,next)=>{
    try{
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("The hotel has been deleted.");
    }catch(err){
        next(err);
    }
}

export const getUser=async(req,res,next)=>{
    try{
        const User =await user.findById(req.params.id);
        res.status(200).json(User);
    }catch(err){
        next(err);
    }
}
export const getAllUser=async(req,res,next)=>{
    try{
        const users =await user.find();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}
