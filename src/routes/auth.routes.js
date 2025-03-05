const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller.js");
const { authenticateToken } = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validate.js");
const { registerUser } = require("../validations/user.js");

router.post("/register", validate(registerUser), AuthController.register);
router.post("/login", AuthController.login);
router.get("/protected", authenticateToken, AuthController.protectedRoute);

module.exports = router;
