import hotel from "../models/hotel.js";

export const createHotel=async(req,res,next)=>{
    const newHotel = new hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}

export const updateHotel=async(req,res,next)=>{
    try{
        const updateHotel = await hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updateHotel);
    }catch(err){
        next(err);
    }
}

export const deleteHotel=async(req,res,next)=>{
    try{
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("The hotel has been deleted.");
    }catch(err){
        next(err);
    }
}

export const getHotel=async(req,res,next)=>{
    try{
        const Hotel =await hotel.findById(req.params.id);
        res.status(200).json(Hotel);
    }catch(err){
        next(err);
    }
}
export const getAllHotel=async(req,res,next)=>{
    try{
        const hotels =await hotel.find();
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    }
}

export const getAllByCity=async(req,res,next)=>{
    const cities=req.query.cities.split(",");
    try{
        const list =await Promise.all(cities.map(city=>{
            return hotel.countDocuments({city:city});
        }));
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
}

export const getAllByType=async(req,res,next)=>{

    try{
        const hotelCount = await hotel.countDocuments({type:"hotel"});
        const apartmentCount = await hotel.countDocuments({type:"apartment"});
        const resortCount = await hotel.countDocuments({type:"resort"});
        const villaCount = await hotel.countDocuments({type:"villa"});
        const cabinCount = await hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            { type:"hotels", count: hotelCount},
            { type:"apartments",count: apartmentCount},
            { type:"resorts",count: resortCount},
            { type:"villas",count: villaCount},
            { type:"cabins",count: cabinCount},
        ]);
    }catch(err){
        next(err);
    }
}
