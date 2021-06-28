const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // 아이디
  email: {
    type: String,
    required: true,
  },

  // 비밀번호
  password: {
    type: String,
    required: true,
  },

  // 반려동물 이름 = 닉네임
  nickname: {
    type: String,
    required: true,
  },

  // 반려동물 종류
  type: {
    type: String,
  },

  // 전화번호
  phone: {
    type: Number,
  },

  // 가입일자
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 회원등급 (관리자 - 0, 일반회원 - 3, 우수회원 - 2, 최우수회원 - 1)
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
