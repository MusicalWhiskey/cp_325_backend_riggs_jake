import Scores from "../models/scores.js";

export async function fetchAllScores(req, res, next) {
    try {
        const scores = await Scores.find();
        res.json(scores);
    } catch (e) {
        console.error(e);
        
    }
}