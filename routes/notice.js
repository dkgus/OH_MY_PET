const express = require("express");
const router = express.Router();

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
router.route("/").get(showAllNotices);

// notices/new
router.route("/new").get(showCreateForm).post(createNotice);

// notices/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateNotice)
  .delete(deleteNotice);

// notices/:id
router.route("/:id").get(showNotice);

// notices/new
router.route("/new").get(showCreateForm).post(createNotice);

module.exports = router;