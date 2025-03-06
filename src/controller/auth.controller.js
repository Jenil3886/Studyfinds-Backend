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
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found with this email!" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "30d",
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

  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate password reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
      await user.save();

      // Send password reset email (replace with your email service)
      const resetLink = `http://your-frontend-url/reset-password?token=${resetToken}`;
      console.log("Password reset link:", resetLink); // For demonstration

      res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async resetPassword(req, res) {
    const { token } = req.query;
    const { newPassword } = req.body;

    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Update password and clear reset fields
      user.password = newPassword; // Assuming your model handles password hashing
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
