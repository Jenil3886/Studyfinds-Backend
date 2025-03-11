const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  follower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followed_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Follower", followerSchema);
