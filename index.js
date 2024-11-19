import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import { connect } from "./db/connect.js";


app.use(express.json({extended: true }));
app.use(express.urlencoded({extended: true }));
app.use(cors());
app.use("/user", userRoutes);

dotenv.config();
connect();

const app = express();
const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/chats', chatsRouter);

app.get('/', async (req, res) => {
    res.send(`Step Up! It's Time to Tick Tock Toe!`)
});


// Error handler
app.use((error, req, res, next) => {
    res.status(500).json({error});
})

app.listen(PORT, () => {
    console.log(`Eff it. We'll do it live on ${PORT}`);
});