import express from "express";
import hotel from "../models/hotel.js";
import { verifyAdmin} from "../utils/verifyToken.js";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getAllByCity, getAllByType, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.js";
const router = express.Router();
//Save
router.post("/",verifyAdmin,createHotel);
//Update
router.put("/:id",verifyAdmin,updateHotel);
//Delete
router.delete("/:id",verifyAdmin,deleteHotel);
//Get
router.get("/find/:id",getHotel);
//GetAll
router.get("/",getAllHotel);
router.get("/countByCity",getAllByCity);
router.get("/countByType",getAllByType);
export default router;