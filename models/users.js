import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const usersSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 },
    accountCreationDate: { type: Date, default: Date.now },
    lastLoginDate: { type: Date, default: Date.now }
  });

  usersSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcryptjs.hash(user.password, 8);
    }
    next();
  });

const Users = mongoose.model('Users', usersSchema);
export default Users;   