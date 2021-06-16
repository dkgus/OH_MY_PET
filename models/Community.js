const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  // 글쓴이 식별용 user id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  // 글제목
  title: {
    type: String,
    required: true,
  },

  // 글내용
  content: {
    type: String,
    required: true,
  },

  // 작성일
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 수정일
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Community", communitySchema);
