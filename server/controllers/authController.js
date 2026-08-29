const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   SIGNUP
========================= */

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

/* =========================
   LOGIN
========================= */

const login = async (req, res) => {
  try {
    console.log("================================");
    console.log("LOGIN REQUEST RECEIVED");
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email or password missing");

      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    console.log("Email being searched:", cleanEmail);

    /* Show which database the backend is using */
    console.log("MongoDB database:", User.db.name);

    /* Show emails currently visible to THIS backend */
    const users = await User.find({})
      .select("name email")
      .lean();

    console.log("Users visible to backend:", users);

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      console.log("❌ USER NOT FOUND:", cleanEmail);

      return res.status(400).json({
        message: "User not found",
      });
    }

    console.log("✅ User found:", user.email);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      console.log("❌ INVALID PASSWORD");

      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mysecretkey",
      {
        expiresIn: "1d",
      }
    );

    console.log("✅ LOGIN SUCCESSFUL");
    console.log("================================");

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

/* =========================
   GET CURRENT USER
========================= */

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE PROFILE
========================= */

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (email) {
      const cleanEmail = email.trim().toLowerCase();

      if (cleanEmail !== user.email) {
        const existingUser = await User.findOne({
          email: cleanEmail,
          _id: { $ne: req.user.id },
        });

        if (existingUser) {
          return res.status(400).json({
            message: "Email is already in use",
          });
        }

        user.email = cleanEmail;
      }
    }

    if (name && name.trim()) {
      user.name = name.trim();
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile,
};