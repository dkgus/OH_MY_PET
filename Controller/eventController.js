const Event = require("../models/Event");
const User = require("../models/User");
const { getCurrentDate } = require("../utils/date");

module.exports = {
  // @description    Show all events
  // @route          GET /event
  showAllEvents: async (req, res) => {
    const events = await Event.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("user");
    const user = await User.findOne({ _id: req.user._id }, {});
    const token = req.cookies.token;

    res.render("event/index", { events, user, token });
  },

  // @description    Show a event
  // @route          GET /event/:id
  showEvent: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
      const user = await User.findOne({ _id: req.user._id }, {});
      const token = req.cookies.token;
      res.render("event/show", { event, user, token });
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a register form
  // @route          GET /event/new
  showCreateForm: async (req, res) => {
    await res.render("event/new");
  },

  // @description    Create a new event reservation
  // @route          POST /event/new
  createEvent: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newEvent = new Event({
        eventNm: req.body.eventNm,
        revDate: req.body.revDate,
        user: user,
      });

      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Get a new event reservation
  // @route          GET /event/getInfo
  getEventInfo: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user.id }).populate("user", [
        "name",
        "phone",
        "email",
        "nickname",
        "type",
      ]);

      //전체회원의 모든 예약정보 조회가능
      //const events = await Event.find().populate("user", ["name", "phone"]);

      return res.json(events);
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a update form
  // @route          GET /event/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;
      res.render("event/edit", { event, token });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a user
  // @route          PUT /event/:id/edit
  updateEvent: async (req, res) => {
    try {
      await Event.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
        res.redirect("/event/" + req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Delete a user
  // @route          DELETE /event/:id/edit
  deleteEvent: async (req, res) => {
    try {
      await Event.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/event");
      });
    } catch (err) {
      console.error(err);
    }
  },
};
