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
router.route("/").get( isAuthenticatedUser, showAllPosts);

// community/new
router.route("/new").get(showCreateForm).post(isAuthenticatedUser, createPost);

// community/:id
router.route("/:id").get(showPost);

// community/:id/edit
router.route("/:id/edit").get(showUpdateForm).put(updatePost);


//community/:id/delete
router.route("/:id/delete").get(deletePost);


// community/:id
router.route("/:id").get( isAuthenticatedUser, showPost);

module.exports = router;