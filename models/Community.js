const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  // 작성일
  createdAt: {
    type: Date,
    default: Date,
  },

  // 수정일
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Community", communitySchema);
