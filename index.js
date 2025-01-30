import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import usersRoutes from "./routes/users.js";
import registerRoutes from "./routes/register.js";
import loginRoutes from "./routes/login.js";
import Scores from "./models/scores.js";
import { connect } from "./db/connect.js";

const app = express();
app.use(express.json({extended: true }));
app.use(express.urlencoded({extended: true }));
app.use(cors());
app.use(express.static('public'));

dotenv.config();
connect();

const PORT = process.env.PORT || 8080;

// Routes

app.use('/api/users', usersRoutes);

app.use('/api/register', registerRoutes);

app.use('/api/login', loginRoutes);

app.use('/api/scores', Scores);

app.get('/api/register', async (req, res) => {
    res.send(`We Registering in this Bitch`);
});


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