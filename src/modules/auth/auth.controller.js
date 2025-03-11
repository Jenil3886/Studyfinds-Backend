const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { JWT_SECRET } = require("../../config/config");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

class AuthController {
	static async forgotPassword(req, res) {
		const { email } = req.body;

		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}

			const resetToken = crypto.randomBytes(20).toString("hex");
			const resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

			user.resetPasswordToken = resetToken;
			user.resetPasswordExpires = resetPasswordExpires;
			await user.save();

			const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetPassword/${resetToken}`;

			const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

			const transporter = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASS,
				},
			});

			await transporter.sendMail({
				to: user.email,
				subject: "Password reset token",
				text: message,
			});

			res.status(200).json({ message: "Email sent" });
		} catch (error) {
			res.status(500).json({ message: "Server error" });
		}
	}

	static async resetPassword(req, res) {
		const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

		try {
			const user = await User.findOne({
				resetPasswordToken,
				resetPasswordExpires: { $gt: Date.now() },
			});

			if (!user) {
				return res.status(400).json({ message: "Invalid token" });
			}

			user.password = req.body.password;
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			await user.save();

			res.status(200).json({ message: "Password reset successful" });
		} catch (error) {
			res.status(500).json({ message: "Server error" });
		}
	}
}

module.exports = AuthController;
