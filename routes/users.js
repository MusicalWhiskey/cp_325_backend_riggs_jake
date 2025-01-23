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


router.delete("/", async (req, res) => {
    try {
        await Users.deleteMany({});
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router;
