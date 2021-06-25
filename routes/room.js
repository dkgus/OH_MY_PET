const express  = require('express');
const router = express.Router();

const {
  showAllNotices,
  showNotice,
  showCreateForm,
  createNotice,
  showUpdateForm,
  updateNotice,
  deleteNotice,
} = require("../controllers/roomController");



// room/
router.route("/").get(showAllPosts);

// room/:id
router.route("/:id").get(showPost);

// room/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updatePost)
  .delete(deletePost);

// room/new
router.route("/new").get(showCreateForm).post(createPost);

module.exports = router;










