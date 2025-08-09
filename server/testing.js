// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin"
  });

  await admin.save();
  console.log("Admin user created");
  process.exit();
};

createAdmin();
