import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config.js';

// Define the User schema using Mongoose
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: () => crypto.randomUUID() },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

export class UserRepository {
  // Create a new user
  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error('This username is already taken!');

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create and save the new user
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    return user._id; // Return the user ID after creation
  }

  // Log in a user
  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) throw new Error(`User ${username} not found`);

    // Compare the provided password with the stored hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    // Return user info without the password
    const { password: _, ...publicUser } = user.toObject();

    return publicUser;
  }
}

// Validation helper class
class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string');
    if (username.length < 3) throw new Error('Username must be at least 3 characters long');
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('Password must be a string');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
  }
}
