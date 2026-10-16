import express from "express";
import User from "../models/User.js"


export const register = async (req, res) => {
    try {
        const { name, email,sourceLanguage,toLanguage,deliveryOptions,message,urgentReq,notarization } = req.body;

        const user = new User({ name, email,sourceLanguage,toLanguage,deliveryOptions,message,urgentReq,notarization });

        await user.save();
        return res.status(201).json({ message: "User created successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        else if (user.password != password) {
            return res.status(401).json({ message: "Invalid password" })
        }
        else {
            return res.status(200).json({ message: "User logged in successfully" })
        }
    }
    catch {


    }
}
export const getUsers = async (req, res) => {
    try {
        
        const user = await User.find();
        return res.status(200).json(user)
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const getUserbyId = async (req, res) => {
    try {
        const id =req.params.id()
        const user = await User.findById(id);
        return res.status(200).json(user)
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body);
        user.save()
        res.status(200).json(user)
        console.log("User updated successfully", user)
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const delUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully", user);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
