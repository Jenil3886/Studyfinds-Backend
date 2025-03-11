const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const appRoutes = require("./src/routes/index.routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const cors = require("cors");
app.use(
	cors({
		origin: "http://localhost:5173", // frontend URL
		credentials: true,
	})
);

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
app.use("/api", appRoutes);

module.exports = {
	app,
};
