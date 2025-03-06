const express = require("express");
const authRoutes = require("./routes/authRoutes");
const { PORT } = require("./config/config");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

//index.js

// const { app } = require("./app.js");

// const dotenv = require("dotenv");
// dotenv.config();

// const port = process.env.PORT || 8080;

// app.listen(port, () => {
// 	console.log(`Server is listening on PORT: ${port}`);
// });

// app.js

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const authRoutes = require("./src/routes/auth.routes");

// dotenv.config();

// const app = express();

// app.use(express.json());

// const connectToMongoDb = async (url) => {
// 	try {
// 		await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// 		console.log("Mongodb Connected!");
// 	} catch (error) {
// 		console.error("Error connecting to MongoDB:", error);
// 		process.exit(1);
// 	}
// };

// const mongoUrl = process.env.MONGO_URL;
// if (!mongoUrl) {
// 	console.error("MONGO_URL environment variable is not defined");
// 	process.exit(1);
// }

// connectToMongoDb(mongoUrl);

// // Routes
// app.use("/api/auth", authRoutes);

// module.exports = {
// 	app,
// };
