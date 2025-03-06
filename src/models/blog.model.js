const { createHmac } = require("crypto");
const { Schema, model } = require("mongoose");
const { type } = require("os");
const { string, number } = require("zod");

// export const HOME_ITEMS = [
// 	{
// 		id: "da7924ec-6d9d-4cf6-bb59-dc92f9bd2873",
// 		title: "Top 10 Budget-Friendly Smartphones",
// 		tags: ["#tech", "#smartphones", "#budget"],
// 		description: "Find out which budget smartphones are worth buying in 2025.",
// 		imageUrl: "/Frontend/src/assets/img/items/image (1).webp",
//      source: { name: "source", srcIcon: "IoIosLink", avatar: "" },
// 		stats: { comments: 5, views: 120, sparks: 15 },
// 		user: { name: "@samuser2", time: "2 hours ago", avatar: "/src/components/img/image2.webp", avatarInitial: "gj", avatarColor: "#FF5722" },
// 		open: "45",
// 	},

const blogSchema = new Schema(
	{
		id: {
			type: String,
			require: true,
			unique: true,
		},
		title: {
			type: String,
			require: true,
			unique: true,
		},
		description: {
			type: String,
		},
		tags: {
			type: String,
			require: true,
			unique: true,
		},
		source: {
			name: {
				type: string,
				require: true,
			},
			avatar: {},
		},
		status: {
			comments: { type: number },
			views: { type: number },
			sparks: { type: number },
		},
		user: {
			name: {},
			time: {},
		},
		open: {
			type: number,
		},
	},
	{ timestamps: true }
);

module.exports = { blogSchema };
