const Community = require("../models/Community");
const User = require("../models/User");

module.exports = {
  // @description    Show all posts
  // @route          GET /community
  showAllPosts: async (req, res) => {
    const data = {
      addCss: ["board"],
      addScript: ["board"],
    };
    const posts = await Community.find({ user: req.user._id }).populate("user");
    const user = await User.findOne({ _id: req.user._id }, {});

    res.render("community/index", { data, posts, user });
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

  // @description    Create a new post
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
      await Community.create({ title, content });
      res.redirect("/community");
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

  // @description    Update a post
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

  // @description    Delete a post
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
