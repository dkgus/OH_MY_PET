const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../../utils/auth");


const {
    showAllPosts,
    showPost,
    showUpdateForm,
    updatePost,
    deletePost,
} = require("../../controller/deleteController");



// admin/community/
router.route("/").get( isAuthenticatedUser, showAllPosts);

// admin/community/:id
router.route("/:id").get(isAuthenticatedUser,showPost);

// admin/community/:id/edit
router.
route("/:id/edit")
.get(isAuthenticatedUser,showUpdateForm)
.put(isAuthenticatedUser, updatePost)
.delete( isAuthenticatedUser, deletePost);


module.exports = router;
