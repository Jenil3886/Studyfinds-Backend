const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");
const User = require("../models/user.js");
const { JWT_SECRET } = require("../config/config.js");

class AuthController {
  static async register(req, res) {
    const body = req.body;

    try {
      const existingUser = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      if (existingUser) {
        if (existingUser.email === body.email)
          return res.status(400).json({ message: "Email already taken" });
        else if (existingUser.username.toLowerCase() === body.username.toLowerCase())
          return res.status(400).json({ message: "Username already taken" });
      }

      await User.create(body);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findByUsername(username);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const match = await UserModel.verifyPassword(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  static async protectedRoute(req, res) {
    res.json({
      message: "Protected data",
      user: req.user,
    });
  }
}

module.exports = AuthController;
