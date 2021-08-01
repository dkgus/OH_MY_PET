const Notice = require("../models/Notice");
const User = require("../models/User");
const { getCurrentDate } = require("../utils/date");

module.exports = {
  // @description    Show all notices
  // @route          GET /notices
  showAllNotices: async (req, res) => {
    const user = await User.find({ _id: req.user._id }, {});
    const notices = await Notice.find({})
    .sort({ createdAt: -1 })
    .skip((1-1)*10) 
    .limit(10);
    const token = req.cookies.token;

    res.render("notices/index", { notices, user, token });
  },

  // @description    Show a notice
  // @route          GET /notices/:id
  showNotice: async (req, res) => {
    try {
      const user = await User.find({ _id: req.user._id }, {});
      const notice = await Notice.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;
      res.render("notices/show", { notice, user, token });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a write form
  // @route          GET /notices/new
  showCreateForm: async (req, res) => {
    const token = req.cookies.token;
    await res.render("notices/new", { token });
  },

  // @description    Create a new notice
  // @route          POST /notices/new
  createNotice: async (req, res) => {
    const { title, content, role, createdAt } = req.body;
    
    //const createAtForm = moment().format("YYYY-MM-DD HH:mm:ss")
    try {
      // validation
      // 필수 정보를 모두 입력했는지?
      if (!title || !content || !role) {
        const msg = "글 제목, 내용, 등급을 모두 입력해주세요.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }

      await Notice.create({ title, content, user: req.user._id, name: req.user.name, createdAt, });
      
      res.redirect("/notices");
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },

  // @description    Show a update form
  // @route          GET /notices/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const notice = await Notice.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;
      res.render("notices/edit", { notice, token });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a user
  // @route          PUT /notices/:id/edit
  updateNotice: async (req, res) => {
    try {
      await Notice.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
        res.redirect("/notices/" + req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Delete a user
  // @route          DELETE /notices/:id/edit
  deleteNotice: async (req, res) => {
    try {
      await Notice.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/notices");
      });
    } catch (err) {
      console.error(err);
    }
  },
};
