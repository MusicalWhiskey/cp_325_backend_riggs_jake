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

export default router;