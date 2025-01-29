import express from "express";
import Users from "../models/users.js";

const app = express();

app.use(express.json());

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put("/score", async (req, res) => {
    const { username, score } = req.body;
    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.score = score;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/", async (req, res) => {
    try {
        await Users.deleteMany({});
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router;
