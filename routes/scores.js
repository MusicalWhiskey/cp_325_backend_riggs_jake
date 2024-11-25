import express from "express";
import Scores from "../models/scores.js";

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
    const score = req.body;
    const newScore = new Scores(score);
    try {
        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.delete("/", async (req, res) => {
    try {
        await Scores.deleteMany({});
        res.status(200).json({ message: "Score deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put("/", async (req, res) => {
    const score = req.body;
    try {
        await Scores.updateMany({}, { $set: { score: score } });
        res.status(200).json({ message: "Scores updated successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


export default router;