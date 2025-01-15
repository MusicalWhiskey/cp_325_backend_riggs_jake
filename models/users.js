import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accountCreationDate: { type: Date, default: Date.now },
  });

const Users = mongoose.model('Users', usersSchema);
export default Users;   

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // Install bcrypt for password hashing

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstName: String,
  lastName: String,
  birthday: Date,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accountCreationDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.post('/api/users', [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('password').isLength({ min: 8 }).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/).withMessage('Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, firstName, lastName, birthday, email, password, accountCreationDate } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    firstName,
    lastName,
    birthday,
    email,
    password: hashedPassword,
    accountCreationDate,
  });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'Username or Email already exists' });
    } else {
      res.status(400).send(error);
    }
  }
});

app.post('/api/login', [
  check('usernameOrEmail').notEmpty().withMessage('Username or Email is required'),
  check('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    // Generate a token or start a session here for the authenticated user
    res.status(200).send({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
