const { text } = require("body-parser");
const mongoose = require("mongoose");


const roomSchema = new mongoose.Schema({


// 글쓴이 식별용 user id
user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },


//방 종류: select box에서 dorm 또는 family만 선택가능
roomType: {
    type: String,
    required: true,
},

//이용 시작일
revStart: {
    type: Date,
    default: Date,
},

//이용 종료일
revEnd: {
    type: Date,
    default: Date,
},

//예약일
regDt: {
    type: Date,
    default: Date.now,
},

//특이사항
memo: {
    type: text,
}

});


module.exports = mongoose.model("Room", roomSchema);