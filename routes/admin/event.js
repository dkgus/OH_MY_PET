const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../../utils/auth");

const {
  showAllEvents,
  showEvent,
  showUpdateForm,
  updateEvent,
  deleteEvent,
} = require("../../controller/deleteController");

// admin/event/
router.route("/").get(isAuthenticatedUser, showAllEvents);

// admin/event/:id
router.route("/:id").get(isAuthenticatedUser, showEvent);

// admin/event/:id/edit
router
  .route("/admin/:id/edit")
  .get(isAuthenticatedUser, showUpdateForm)
  .put(isAuthenticatedUser, updateEvent)
  .delete(isAuthenticatedUser, deleteEvent);

module.exports = router;
