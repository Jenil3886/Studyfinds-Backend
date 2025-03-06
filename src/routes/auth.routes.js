const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller.js");
const { authenticateToken } = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validate.js");
const { registerUser, loginUser } = require("../validations/user.js");

router.post("/register", validate(registerUser), AuthController.register);
router.post("/login", validate(loginUser), AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.get("/protected", authenticateToken, AuthController.protectedRoute);

module.exports = router;
