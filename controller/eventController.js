const Event = require('../models/Event');




// @description    Show all posts
// @route          GET /event
export const showAllPosts = async (req, res) => {
  await Event.find({})
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      res.render("event/index", { posts: posts });
    });
};

// @description    Show a post
// @route          GET /event/:id
export const showPost = async (req, res) => {
  try {
    const post = await Event.findOne({ _id: req.params.id }, {});
    res.render("event/show", { post: post });
  } catch (err) {
    console.error(err);
  }
};

// @description    Show a write form
// @route          GET /event/new
export const showCreateForm = async (req, res) => {
  await res.render("event/new");
};

// @description    Create a new notice
// @route          POST /event/new
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    // validation
    // 필수 정보를 모두 입력했는지?
    if (!nickname || !phone || !lecTitle) {
      const msg = "반려동물의 이름, 연락처, 강연제목을 입력해주세요.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }
    await Event.save();
    res.redirect("/event");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// @description    Show a update form
// @route          GET /event/:id/edit
export const showUpdateForm = async (req, res) => {
  try {
    const post = await Event.findOne({ _id: req.params.id }, {});
    res.render("event/edit", { post: post });
  } catch (err) {
    console.error(err);
  }
};

// @description    Update a reservation
// @route          PUT /event/:id/edit
export const updatePost = async (req, res) => {
  try {
    await Event.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
      res.redirect("/event/" + req.params.id);
    });
  } catch (err) {
    console.error(err);
  }
};

// @description    Delete a reservation
// @route          DELETE /event/:id/edit
export const deletePost = async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id }, () => {
      res.redirect("/event");
    });
  } catch (err) {
    console.error(err);
  }
};

