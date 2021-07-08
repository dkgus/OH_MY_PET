const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, isAdmin, isGoldMember } = require("../utils/auth");

const {
  showAllEvents,
  showEvent,
  showCreateForm,
  createEvent,
  showUpdateForm,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// event/
router.route("/").get(isAuthenticatedUser, showAllEvents);

// event/new
router
  .route("/new")
  .get(isAuthenticatedUser, showCreateForm)
  .post(isAuthenticatedUser, createEvent);

// event/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateEvent)
  .delete(deleteEvent);

// event/:id
router.route("/:id").get(isAuthenticatedUser, showEvent);

module.exports = router;
