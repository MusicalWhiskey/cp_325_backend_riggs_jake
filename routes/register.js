import express from "express";
import Users from "../models/users.js";
import Joi from "joi";
import bcryptjs from "bcryptjs";

const app = express();

app.use(express.json());

const router = express.Router();

const schema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post("/", async (req, res) => {
  console.log(req.body); // Add this line
  try {
    const { username, firstName, lastName, birthday, email, password } = req.body;
    const user = new Users({ username, firstName, lastName, birthday, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});
  
export default router;