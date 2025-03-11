const { Router } = require("express");
const UserController = require("../controller/user.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = Router();

const userController = new UserController();

router.get("/", authenticateToken, userController.getAllUsers);
router.get("/profile", authenticateToken, userController.getProfile);

module.exports = router;
