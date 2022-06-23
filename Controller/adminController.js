const User = require("../models/User");
const Event = require("../models/Event");
const Room = require("../models/Room");

module.exports = {
  // @description    Show all user
  // @route          GET /admin/usersInfo
  getAllUserInfo: async (req, res) => {
    try {
      const user = await User.find().select("-password");
      return res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },

  // @description    Show all event reservation
  // @route          GET /admin/eventInfo
  getAllEventInfo: async (req, res) => {
    try {
      const event = await Event.find().populate("user", ["-password"]);
      return res.json(event);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },

  // @description    Show all room reservation
  // @route          GET /admin/roomInfo
  getAllRoomInfo: async (req, res) => {
    try {
      const room = await Room.find().populate("user", ["-password"]);
      return res.json(room);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },
};
