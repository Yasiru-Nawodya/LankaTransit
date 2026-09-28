const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({
      email: "test@lankatransit.lk",
    });

    if (existingUser) {
      console.log("Test user already exists");
      return;
    }

    await User.create({
      name: "Test User",
      email: "test@lankatransit.lk",
      password: "Test1234",
      role: "user",
    });

    console.log("Test user created successfully");
  } catch (error) {
    console.error("Error creating test user:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

createTestUser();