const express = require("express");
const router = express.Router();

const {
  showAllPosts,
  showPost,
  showCreateForm,
  createPost,
  showUpdateForm,
  updatePost,
  deletePost,
} = require("../controllers/communityController");

// community/
router.route("/").get(showAllPosts);

// community/new
router.route("/new").get(showCreateForm).post(createPost);

// community/:id
router.route("/:id").get(showPost);

// community/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updatePost)
  .delete(deletePost);

// community/:id
router.route("/:id").get(showPost);

module.exports = router;
