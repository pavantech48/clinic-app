import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// =======================
// REGISTER USER
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 🔥 CREATE JWT TOKEN (FIX)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // response
    res.status(201).json({
      message: "User registered successfully",
      user,
      token, // ✅ FIX ADDED
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// =======================
// LOGIN USER
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password (plain text for now)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 CREATE JWT TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // response
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;