import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import usersRoutes from "./routes/users.js";
import scoresRoutes from "./routes/scores.js";
import { connect } from "./db/connect.js";

const app = express();
app.use(express.json({extended: true }));
app.use(express.urlencoded({extended: true }));
app.use(cors());
app.use("/scores", scoresRoutes);
app.use("/users", usersRoutes);

dotenv.config();
connect();

const PORT = process.env.PORT || 4000;

// Routes
app.use('/api/scores', scoresRoutes);

app.use('/api/users', usersRoutes);


app.get('/', async (req, res) => {
    res.send(`Step Up... It's Time to Tick, Tock, Toe!`)
});


// Error handler
app.use((error, req, res, next) => {
    res.status(500).json({error});
})

app.listen(PORT, () => {
    console.log(`Eff it. We'll do it live on ${PORT}`);
});