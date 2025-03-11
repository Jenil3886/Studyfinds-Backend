const express = require("express");
const AuthController = require("./auth.controller");

const router = express.Router();

// Register route
router.post("/register", AuthController.register);

// Login route
router.post("/login", AuthController.login);

// Forgot password route
router.post("/forgotPassword", AuthController.forgotPassword);

// Reset password route
router.put("/resetPassword/:token", AuthController.resetPassword);

module.exports = router;
