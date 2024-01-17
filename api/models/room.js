import mongoose from 'mongoose';
const { Schema } = mongoose;
const roomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxPoeple:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{number:Number,unvailableDates:{type:[Date]}}],
},{timestamps:true});

export default mongoose.model("Room", roomSchema);