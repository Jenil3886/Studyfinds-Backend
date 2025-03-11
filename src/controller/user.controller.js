const User = require("../models/user.model.js");
const { objectId } = require("../utils/common.js");

class UserController {
	constructor() {}

	async getAllUsers(req, res) {
		try {
			const users = await User.find(
				{ ...(req.user?.id && { _id: { $ne: objectId(req.user.id) } }) },
				"name username email followers description avatar initials bgColor"
			);
			console.log(users);
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async getProfile(req, res) {
		try {
			const user = await User.findById(req.user.id, "name username email followers description avatar initials bgColor");
			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

module.exports = UserController;
