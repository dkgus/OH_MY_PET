const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({


// 글쓴이 식별용 user id
user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },


//강연 제목
lecNm : {
    type: String,
    required: true,
},

//예약 번호
revNo : {
    type: Number,
    required: true,

},
});


module.exports = mongoose.model("Event", eventSchema);