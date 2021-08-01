const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  // 글쓴이 식별용 user id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  // 글쓴이 닉네임
  name: {
    type: String,
    required: true,
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
    type: String,
  },

  // 수정일
  modifiedAt: {
    type: Date,
  },
});


module.exports = mongoose.model("Community", communitySchema);