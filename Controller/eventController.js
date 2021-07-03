  
const Event = require('../models/Event');



module.exports = {
  // @description    Show all events
  // @route          GET /event
  showAllEvents: async (req, res) => {
    await Event.find({})
      .sort({ createdAt: -1 })
      .exec((err, events) => {
        res.render("event/index", { events: events });
      });
  },

  // @description    Show a event
  // @route          GET /event/:id
  showEvent: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
      res.render("event/show", { event: event });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a write form
  // @route          GET /event/new
  showCreateForm: async (req, res) => {
    await res.render("event/new");
  },

  // @description    Create a new event
  // @route          POST /event/new
  createEvent: async (req, res) => {
    const { nickname, phone, eventNm } = req.body;//req.body에서 받은것중에 사용할 것들만 꺼내서 쓰기
  try {
    // validation
    // 필수 정보를 모두 입력했는지?
    if (!nickname || !phone || !eventNm) {
      const msg = "반려동물의 이름, 연락처, 이벤트명을 입력해주세요.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }
      await Event.create({ eventNm, user : req.user._id });//여기 save를 쓸때는 객체가있을때만! 여기서는따로 객체 필요하지않기때문에
      res.redirect("/event");
      console.log(req.user);
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },



  // @description    Create a new event detail form
  // @route          POST /event/detail
	showDetailForm: async (req, res) => {
		try {
        const event = await Event.findOne({});
				res.render("event/detail",{event: event});
		} catch (err) {
			console.error(err);
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
}