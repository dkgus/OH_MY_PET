const Room = require("../models/Room");

module.exports = {
  // @description    Show all rooms
  // @route          GET /room
  showAllRooms: async (req, res) => {
    await Room.find({}) //이쯤에서.populate(참조가 필요한 document이름)-> exec
      //그리고나서 한줄 더추가했는데 뭐였지..조인할때 뭘 추가해야한다고했음
      .sort({ createdAt: -1 })
      .exec((err, rooms) => {
        res.render("room/index", { rooms: rooms });
      });
  },

  // @description    Show a room
  // @route          GET /room/:id
  showRoom: async (req, res) => {
    try {
      const room = await Room.findOne({ _id: req.params.id }, {});
      res.render("room/show", { room: room }); //여기 후자 room은 변수 room을 가리키고 앞의 room 은 html상 포인문을
      //포인문을 통해 출력될 room.name~이런식으로 될 객체이름이다
      //하지만 두개 나눠서 구분하는것이 번거롭기때문에 room 이렇게 하나만 써주면된다.
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a write form
  // @route          GET /room/new
  showCreateForm: async (req, res) => {
    await res.render("room/new");
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
      await Room.create();
      res.redirect("/room");
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
    ㅌ;
  },

  // @description    Show a update form
  // @route          GET /room/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const room = await Room.findOne({ _id: req.params.id }, {});
      res.render("room/edit", { room: room });
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
