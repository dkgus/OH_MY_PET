const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({


// 글쓴이 식별용 user id
user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },


//이벤트 명
eventNm : {
    type: String,
    required: true,
},

// //이벤트 예약 번호
// eventNo : {
//     type: Number,
//     required: true,

// },
});


module.exports = mongoose.model("Event", eventSchema);