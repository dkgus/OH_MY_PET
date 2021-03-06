const Room = require('../models/Room');
const User = require("../models/User");



module.exports = {
  // @description    Show all rooms
  // @route          GET /room
  showAllRooms: async (req, res) => {
    const rooms = await Room.find({ user: req.user._id }).populate("user");
    const user = await User.findOne({ _id: req.user._id }, {});
    const token = req.cookies.token
    
    res.render("room/index", { rooms, user, token });
    // .sort({ createdAt: -1 })
    // .exec((err, rooms) => {
    // });
  },

  // @description    Show a room
  // @route          GET /room/:id
  showRoom: async (req, res) => {
    try {
      const room = await Room.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;

      res.render("room/show", { room, token }); //여기 후자 room은 변수 room을 가리키고 앞의 room 은 html상 포인문을
                                              //포인문을 통해 출력될 room.name~이런식으로 될 객체이름이다
                                              //하지만 두개 나눠서 구분하는것이 번거롭기때문에 room 이렇게 하나만 써주면된다.
    } catch (err) {
      console.error(err);
    }
  },

  

  // @description    Show hotel list
  // @route          GET /room/list
  showRoomList: async (req, res) => {
    const token = req.cookies.token;

    await res.render("room/list",{token});
  },




  // @description    Show a write form
  // @route          GET /room/new
  showCreateForm: async (req, res) => {
    const token = req.cookies.token;

    await res.render("room/new", {token});
  },

  // @description    Create a new room
  // @route          POST /room/new
  createRoom: async (req, res) => {
    const { nickname, phone, email, hotelName, roomType, revStart, revEnd } =
      req.body;
    try {
      // validation
      // 필수 정보를 모두 입력했는지?
      if (
        !nickname ||
        !phone ||
        !email ||
        !hotelName ||
        !roomType ||
        !revStart ||
        !revEnd
      ) {
        const msg =
          "이름, 연락처, 이메일, 호텔명, 객실종류, 일정시작일, 일정 종료일을 입력해주세요.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }
      await Room.create({
        hotelName,
        roomType,
        revStart,
        revEnd,
        user: req.user._id,
      });
      res.redirect("/room");
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },

  // @description    Show a update form
  // @route          GET /room/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const room = await Room.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;
      res.render("room/edit", { room, token });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a room
  // @route          PUT /room/:id/edit
  updateRoom: async (req, res) => {
    try {
      await this.deleteRoom.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        () => {
          res.redirect("/room/" + req.params.id);
        }
      );
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Delete a room
  // @route          DELETE /room/:id/edit
  deleteRoom: async (req, res) => {
    try {
      await Room.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/room");
      });
    } catch (err) {
      console.error(err);
    }
  },
};