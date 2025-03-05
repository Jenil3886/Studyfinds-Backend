const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/auth.routes");

dotenv.config();

const app = express();

app.use(express.json());

const connectToMongoDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Mongodb Connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MONGO_URL environment variable is not defined");
  process.exit(1);
}

connectToMongoDb(mongoUrl);

// Routes
app.use("/api", authRoutes);

module.exports = {
  app,
};
