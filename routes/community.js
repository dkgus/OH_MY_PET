const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const auth = require("../utils/jwtToken");

const {
  showAllPosts,
  showOnlyOnePost,
  showPost,
  showCreateForm,
  createPost,
  showUpdateForm,
  updatePost,
  deletePost,
} = require("../controller/communityController");

// community/list
router.route("/list").get(auth, showAllPosts);

// community/list/:id/:postId
router.route("/list/:id/:postId").get(auth, showOnlyOnePost);

// community/new
router.route("/new_post").post(auth, createPost);

// community/:id/edit(update)
router.route("/:id/edit").post(updatePost);

//community/delete/:id/deleteId
router.route("/delete/:id/:deleteId").delete(auth, deletePost);

// community/:id
router.route("/:id").get(isAuthenticatedUser, showPost);

module.exports = router;
