const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const protect = require("./middleware/authMiddleware");

require("dotenv").config();

// 2. APP SETUP
const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGINS || "http://localhost:5173"
).split(",").map((origin) => origin.trim());

app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());


const PORT = process.env.PORT || 5000;

// 3. BASIC ROUTE

app.get("/", (req, res) => {
    res.json({
        message: "LankaTransit API is running"
    });
});

// 4. LOGIN ROUTE
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check whether both fields were provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find the user in MongoDB
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare entered password with bcrypt hash
    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

const token = jwt.sign(
  {
    userId: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);


    // Successful authentication
    return res.status(200).json({
      message: "Login successful",

    token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// 5. PROFILE ROUTE
app.get("/api/auth/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`LankaTransit server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

