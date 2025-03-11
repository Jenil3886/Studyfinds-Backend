// const mongoose = require("mongoose");

// const cacheSchema = new mongoose.Schema({
// 	user_id: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "User",
// 		required: true,
// 	},
// 	title: {
// 		type: String,
// 		require: true,
// 	},
// 	type: {
// 		type: String,
// 		enum: ["PUBLIC", "PRIVATE"],
// 		default: "PUBLIC",
// 	},
// 	cover_img: {
// 		type: String,
// 		require: true,
// 	},
// 	items: [
// 		{
// 			item_id: {
// 				type: mongoose.Schema.Types.ObjectId,
// 				ref: "Item",
// 			},
// 			shared_at: {
// 				type: Date,
// 				default: Date.now,
// 			},
// 		},
// 	],
// });

// module.exports = mongoose.model("Cache", cacheSchema);

const mongoose = require("mongoose");

const cacheSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["public", "private"], default: "public" },
    cover_img: { type: String, default: null },
    items: [
      {
        item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
        quantity: { type: Number, default: 1 },
      },
    ],
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Cache = mongoose.model("Cache", cacheSchema);

module.exports = Cache;
