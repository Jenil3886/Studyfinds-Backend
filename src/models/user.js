const { createHmac } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		fullname: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		profileImgURL: {
			type: String,
			default: null,
		},
		role: {
			type: String,
			enum: ["USER", "ADMIN"],
			default: "USER",
		},
		resetPasswordToken: String,
		resetPasswordExpires: Date,
	},
	{ timestamps: true }
);

const User = model("user", userSchema);

userSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModifide("password")) return;
	const salt = randomBytes(16).toString();
	const hashedPassword = createHmac(("sha256", salt))
		.update(user.password)
		.digest("hex");

	this.salt = salt;
	this.password = hashedPassword;

	next();
});

module.exports = User;
