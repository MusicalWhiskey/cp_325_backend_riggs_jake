import express from "express";
import Users from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);    
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const user = req.body;
    const newUser = new Users(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

export default router;