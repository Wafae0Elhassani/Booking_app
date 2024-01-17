import express from "express";
const router = express.Router();
import { verifyAdmin} from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/room.js";
//Save
router.post("/:hotelid",verifyAdmin,createRoom);
//Update
router.put("/:id",verifyAdmin,updateRoom);
//Delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);
//Get
router.get("/:id",getRoom);
//GetAll
router.get("/",getAllRoom);
export default router;