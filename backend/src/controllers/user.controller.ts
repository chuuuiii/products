import { RequestHandler } from "express";
import User from "../models/user.model";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface SignupBody {
  username: string;
  email: string;
  password: string;
}

const generateToken = (_id: string): string => {
  if (!process.env.SECRET_KEY) {
    throw new Error("Missing SECRET_KEY environment variable");
  }
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

export const signIn: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body as SignupBody;

  try {
    // Validate input
    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: 'All fields are required' });
      return;
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ success: false, message: 'Please provide a valid email' });
      return;
    }
    if (!validator.isStrongPassword(password)) {
      res.status(400).json({ success: false, message: 'Weak password' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({ status: 409, message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = generateToken(newUser._id as string);

    // Respond
    res.status(201).json({
      success: true,
      data: { id: newUser._id, username: newUser.username, token },
    });
  } catch (error) {
    next(error); 
  }
};

interface LoginBody {
  username: string;
  password: string;
}

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body as LoginBody;

  try {
    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Both username and password are required' });
      return;
    }

    // Find user with password 
    const user = await User.findOne({ username }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    // const token = generateToken(user._id.toString());
    const token = generateToken(user._id as string);
    res.status(200).json({
      success: true,
      data: { id: user._id, username: user.username, token },
    });
  } catch (error) {
    next(error); 
  }
};
