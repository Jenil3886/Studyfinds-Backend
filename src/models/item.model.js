const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	type: {
		type: String,
		enum: ["PUBLIC", "PRIVATE"],
		default: "PUBLIC",
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	cover_image: {
		type: String,
	},
	description: {
		type: String,
	},
	sources: [
		{
			source_id: {
				type: mongoose.Schema.Types.ObjectId,
			},
			title: {
				type: String,
				required: true,
			},
			image: {
				type: String,
			},
		},
	],
	comments: [
		{
			comment_id: {
				type: mongoose.Schema.Types.ObjectId,
			},
			user_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
			parent_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Item.comments",
			},
			likes: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			created_at: {
				type: Date,
				default: Date.now,
			},
		},
	],
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Item", itemSchema);
