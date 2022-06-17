const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  //이벤트 명
  eventNm: {
    type: String,
    required: true,
  },

  //참여 날짜
  revDate: {
    type: Date,
    default: Date,
  },

  //등록일
  regDt: {
    type: Date,
    default: Date,
  },
});

module.exports = mongoose.model("Event", eventSchema);
