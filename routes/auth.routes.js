import express from "express";
import {register,login,getUserbyId,updateUser,delUser,getUsers } from "../controllers/auth.controller.js"
const router = express.Router();

router.post('/register',register)
router.post("/login", login)
router.get("/get-user",getUsers)
router.get("/getuser",getUserbyId)

router.put("/update-user/:id",updateUser)
router.delete("/delete-user/:id",delUser)

export default router