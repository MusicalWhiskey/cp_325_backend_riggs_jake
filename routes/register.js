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
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
      // Validate the request body
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      console.log("Value:", value);
      console.log("Password:", value.password);
  
      // Hash the password
      const hashedPassword = await bcryptjs.hash(value.password, 8);
      console.log("Hashed Password:", hashedPassword);
  
      // Create a new Users object with the hashed password
      const newUser = new Users({
        ...value,
        password: hashedPassword,
      });
      console.log("New User:", newUser);
  
      // Save the new user to the database
      await newUser.save();
  
      // Send the response
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
export default router;