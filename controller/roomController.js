const Room = require('../models/Room');




// @description    Show all posts
// @route          GET /room
export const showAllPosts = async (req, res) => {
  await Room.find({})
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      res.render("room/index", { posts: posts });
    });
};

// @description    Show a post
// @route          GET /room/:id
export const showPost = async (req, res) => {
  try {
    const post = await Room.findOne({ _id: req.params.id }, {});
    res.render("room/show", { post: post });
  } catch (err) {
    console.error(err);
  }
};

// @description    Show a write form
// @route          GET /room/new
export const showCreateForm = async (req, res) => {
  await res.render("room/new");
};

// @description    Create a new notice
// @route          POST /room/new
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    // validation
    // 필수 정보를 모두 입력했는지?
    if (!nickname || !phone) {
      const msg = "반려동물의 이름과 연락처를 입력해주세요.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }
    await Room.save();
    res.redirect("/room");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// @description    Show a update form
// @route          GET /room/:id/edit
export const showUpdateForm = async (req, res) => {
  try {
    const post = await Room.findOne({ _id: req.params.id }, {});
    res.render("room/edit", { post: post });
  } catch (err) {
    console.error(err);
  }
};

// @description    Update a reservation
// @route          PUT /room/:id/edit
export const updatePost = async (req, res) => {
  try {
    await Room.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
      res.redirect("/room/" + req.params.id);
    });
  } catch (err) {
    console.error(err);
  }
};

// @description    Delete a reservation
// @route          DELETE /room/:id/edit
export const deletePost = async (req, res) => {
  try {
    await Room.deleteOne({ _id: req.params.id }, () => {
      res.redirect("/room");
    });
  } catch (err) {
    console.error(err);
  }
};

