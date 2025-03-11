const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model.js");
const { JWT_SECRET } = require("../config/config.js");
const EmailService = require("../services/email.service.js");

const emailService = new EmailService();

class AuthController {
	constructor() {
		this.emailService = new EmailService();
	}

	async register(req, res) {
		const body = req.body;

		try {
			const existingUser = await User.findOne({
				$or: [{ username: body.username }, { email: body.email }],
			});

			if (existingUser) {
				if (existingUser.email === body.email) return res.status(400).json({ message: "Email already taken" });
				else if (existingUser.username.toLowerCase() === body.username.toLowerCase())
					return res.status(400).json({ message: "Username already taken" });
			}

			await User.create(body);
			res.status(201).json({ message: "User registered successfully" });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getAllUsers(req, res) {
		try {
			const users = await User.find({}, "name username email followers description avatar initials bgColor");
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async login(req, res) {
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
			res.cookie("token", token);
		} catch (error) {
			res.status(500).json({ message: "Server error" });
		}
	}

	async protectedRoute(req, res) {
		try {
			const user = await User.findById(req.user.id, "name username email followers description avatar initials bgColor createdAt");

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			res.json({
				user: {
					name: user.name,
					username: user.username,
					email: user.email,
					followers: user.followers,
					initials: user.initials,
					bgColor: user.bgColor,
					createdAt: user.createdAt,
				},
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async forgotPassword(req, res) {
		console.log("enter forgot password");
		const { email } = req.body;

		try {
			const user = await User.findOne({ email });
			if (!user) return res.status(404).json({ message: "User not found" });

			const resetToken = crypto.randomBytes(20).toString("hex");
			const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

			user.resetPasswordToken = hashedToken;
			user.resetPasswordExpires = Date.now() + 3600000;
			await user.save();

			const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

			const body = `
	  	<body>
			<h1 style="text-align: center">Reset Password for ${process.env.EMAIL_NAME}</h1>
			<p>Your password reset link is: ${resetLink}</p>
		</body>
  		`;

			// Send actual email
			emailService.sendEmail({
				to: user.email,
				subject: "Password Reset Link",
				body,
			});

			res.json({ message: "Password reset link sent to your email" });
		} catch (error) {
			console.error("Error:", error);
			res.status(500).json({ message: "Something went wrong. Please try again later." });
		}
	}

	async resetPassword(req, res) {
		const { token } = req.body;
		const { newPassword } = req.body;

		try {
			if (!token || !newPassword) {
				return res.status(400).json({ message: "Missing required fields" });
			}

			if (newPassword.length < 8) {
				return res.status(400).json({ message: "Password must be at least 8 characters" });
			}

			const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

			const user = await User.findOne({
				resetPasswordToken: hashedToken,
				resetPasswordExpires: { $gt: Date.now() },
			});

			if (!user) {
				return res.status(400).json({ message: "Invalid or expired token" });
			}

			user.password = newPassword; // Model will hash it
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			await user.save();

			res.json({ message: "Password reset successful" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Something went wrong. Please try again later." });
		}
	}
}

module.exports = AuthController;
