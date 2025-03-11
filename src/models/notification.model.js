const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	item_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Item",
	},
	type: {
		type: String,
		enum: ["follow", "new_cache", "new_item"],
		required: true,
	},
	message: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	read: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Notification", notificationSchema);
