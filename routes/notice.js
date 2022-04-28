const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");


const {
  showAllNotices,
  showNotice,
  showCreateForm,
  createNotice,
  showUpdateForm,
  updateNotice,
  deleteNotice,
} = require("../controller/noticeController");

// notices/
router.route("/").get(isAuthenticatedUser, showAllNotices);

// notices/new
router.route("/new").get(showCreateForm).post(isAuthenticatedUser, createNotice);

// notices/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateNotice)


//notices/:id/delete
router.route("/:id/delete").get(deleteNotice);


// notices/:id
router.route("/:id").get(isAuthenticatedUser, showNotice);

module.exports = router;