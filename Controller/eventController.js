const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  // @description    Show all events
  // @route          GET /event
  showAllEvents: async (req, res) => {
    const data = {
      addCss : ['event'],
    };
    const events = await Event.find({ user: req.user._id })
                  .sort({ createdAt: -1 })
                  .populate("user");
    const user = await User.findOne({ _id: req.user._id }, {})
    
    
    res.render("event/index", { data, events , user });
  },


  // @description    Show a event
  // @route          GET /event/:id
  showEvent: async (req, res) => {  
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
      const user = await User.findOne({ _id: req.user._id }, {});
      res.render("event/show", { event, user });
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
    const { nickname, phone, eventNm } = req.body;
    try {
      //validation
      //필수 정보를 모두 입력했는지?
      if (!nickname || !phone || !eventNm) {
        const msg = "반려동물의 이름, 연락처, 이벤트명을 입력해주세요.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }

      await Event.create({ eventNm, user: req.user._id });

      res.redirect("/event");
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },

  // @description    Show a update form
  // @route          GET /event/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
     
      res.render("event/edit", { event: event });
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