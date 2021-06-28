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
} = require("../controllers/noticeController");

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

module.exports = router;
