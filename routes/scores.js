import express from "express";
import Scores from "../models/scores.js";

const app = express();

app.use(express.json());

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const scores = await Scores.find();
        res.status(200).json(scores);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { username, score, date } = req.body;
    const newScore = new Scores({ username, score, date });
    try {
        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;