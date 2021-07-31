const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
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

  // 글 등급 (일반회원 - 3, 우수회원 - 2, 최우수회원 - 1)
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Notice", noticeSchema);