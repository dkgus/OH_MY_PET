const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  // 글쓴이 식별용 user id
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //required: false,
    ref: "User",
  },

  // 댓글 내용
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
  modifiedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("comment", commentSchema);
