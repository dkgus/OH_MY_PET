const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
  showAllPosts,
  showPost,
  showCreateForm,
  createPost,
  showUpdateForm,
  updatePost,
  deletePost,
} = require("../controller/communityController");

// community/
router.route("/").get(showAllPosts);

// community/new
router
  .route("/new")
  .get(isAuthenticatedUser, showCreateForm)
  .post(isAuthenticatedUser, createPost);

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