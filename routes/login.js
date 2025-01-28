import express from "express";
import Users from "../models/users.js";
import bcryptjs from "bcryptjs";

const app = express();

app.use(express.json());

const router = express.Router();

router.post("/", async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await Users.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or email" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

export default router;