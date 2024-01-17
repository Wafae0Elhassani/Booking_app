import express from "express";
import { createUser, deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
/* router.get('/checkAuthentication',verifyToken,(req,res,next)=>{
    res.send('Hello user, you are logged in');
});
router.get('/checkUser/:id',verifyUser,(req,res,next)=>{
    res.send('Hello user, you are logged in and you can delete you account.');
});
router.get('/checkAdmin/:id',verifyAdmin,(req,res,next)=>{
    res.send('Hello Admin, you are logged in and you can delete all accounts.');
}); */
//Save
router.post("/",verifyToken,createUser);
//Update
router.put("/:id",verifyToken,updateUser);
//Delete
router.delete("/:id",verifyToken,deleteUser);
//Get
router.get("/:id",verifyToken,getUser);
//GetAll
router.get("/",verifyAdmin,getAllUser);
export default router;