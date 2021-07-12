const Notice = require("../models/Notice");

module.exports = {
  // @description    Show all notices
  // @route          GET /notices
  showAllNotices: async (req, res) => {
    await Notice.find({})
      .sort({ createdAt: -1 })
      .exec((err, notices) => {
        res.render("notices/index", { notices: notices });
      });
  },

  // @description    Show a notice
  // @route          GET /notices/:id
  showNotice: async (req, res) => {
    try {
      const notice = await Notice.findOne({ _id: req.params.id }, {});
      res.render("notices/show", { notice: notice });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a write form
  // @route          GET /notices/new
  showCreateForm: async (req, res) => {
    await res.render("notices/new");
  },

  // @description    Create a new notice
  // @route          POST /notices/new
  createNotice: async (req, res) => {
    const { title, content, role } = req.body;
    try {
      // validation
      // 필수 정보를 모두 입력했는지?
      if (!title || !content || !role) {
        const msg = "글 제목, 내용, 등급을 모두 입력해주세요.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }

      await Notice.create({ title, content, user: req.user._id });
      
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
      res.render("notices/edit", { notice: notice });
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