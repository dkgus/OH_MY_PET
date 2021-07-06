const Community = require("../models/Community");

module.exports = {
  // @description    Show all posts
  // @route          GET /community
  showAllPosts: async (req, res) => {
    await Community.find({})
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
        res.render("community/index", { posts: posts });
      });
  },

  // @description    Show a post
  // @route          GET /community/:id
  showPost: async (req, res) => {
    try {
      const post = await Community.findOne({ _id: req.params.id }, {});
      res.render("community/show", { post: post });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a write form
  // @route          GET /community/new
  showCreateForm: async (req, res) => {
    await res.render("community/new");
  },

  // @description    Create a new notice
  // @route          POST /community/new
  createPost: async (req, res) => {
    const { title, content } = req.body;
    try {
      // validation
      // 필수 정보를 모두 입력했는지?
      if (!title || !content) {
        const msg = "글 제목, 내용을 모두 입력해주세요.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }
      await Community.create({ title, content, user: req.user._id });
      // res.redirect("/community");
      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  },

  // @description    Show a update form
  // @route          GET /community/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const post = await Community.findOne({ _id: req.params.id }, {});
      res.render("community/edit", { post: post });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a user
  // @route          PUT /community/:id/edit
  updatePost: async (req, res) => {
    try {
      await Community.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
        res.redirect("/community/" + req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Delete a user
  // @route          DELETE /community/:id/edit
  deletePost: async (req, res) => {
    try {
      await Community.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/community");
      });
    } catch (err) {
      console.error(err);
    }
  },
};
