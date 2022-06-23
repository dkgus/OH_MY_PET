const Community = require("../models/Community");
const User = require("../models/User");
//const { Post } = require("../routes/community");

module.exports = {
  // @description    Show all posts
  // @route          GET /community/list
  showAllPosts: async (req, res) => {
    try {
      //const posts = await Community.find({ user: req.user._id }).populate("user");
      const posts = await Community.find()
        .populate("user", ["name", "nickname", "type", "role"])
        .sort({ createdAt: -1 });
      // const user = await User.find({ _id: req.user._id }, {});
      // const posts = await Community.find({}).sort({ createAt: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show only one post
  // @route          GET community/list/:id/:postId
  showOnlyOnePost: async (req, res) => {
    try {
      console.log("req.params", req.params);
      //      const posts = await Community.findOne({ user: req.user._id }).populate("user");
      const post = await Community.findById(req.params.postId).populate(
        "user",
        ["name", "type", "nickname"]
      );
      res.json(post);
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a post
  // @route          GET /community/:id
  showPost: async (req, res) => {
    try {
      const post = await Community.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;
      res.render("community/show", { post, token });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a write form
  // @route          GET /community/new
  showCreateForm: async (req, res) => {
    const token = req.cookies.token;
    await res.render("community/new", { token });
  },

  // @description    Create a new post
  // @route          POST /community/new_post
  createPost: async (req, res) => {
    try {
      //const user = await User.findById(req.user.id).select("-password");
      const user = await User.findById(req.user.id, ["name", "role"]);
      const { title, content } = req.body;

      const newPost = new Community({
        title: title,
        content: content,
        user: user,
      });

      const post = await newPost.save();
      res.json(post);
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
      const token = req.cookies.token;
      res.render("community/edit", { post, token });
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
  // @route          DELETE /community/delete/:id/deleteId
  deletePost: async (req, res) => {
    try {
      console.log("req.params", req.params);
      console.log("req.user1", req.user.id);
      const post = await Community.findById(req.params.deleteId);
      if (!post) {
        return res.status(404).json({ msg: "포스트가 없습니다." });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "삭제 권한이 없습니다." });
      }

      await post.remove();
      res.json({ msg: "삭제되었습니다!!" });
    } catch (err) {
      console.error(err);
    }
  },
};
