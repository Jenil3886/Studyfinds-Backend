const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller.js");
const { authenticateToken } = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validate.js");
const { registerUser, loginUser } = require("../validations/user.js");

const authController = new AuthController();

router.post("/register", validate(registerUser), authController.register);
router.post("/login", validate(loginUser), authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.put("/resetPassword/:token", authController.resetPassword);

module.exports = router;
