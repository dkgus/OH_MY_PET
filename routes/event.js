const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

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
router.route("/").get(showAllEvents);

// event/new
router.route("/new").get(showCreateForm).post(isAuthenticatedUser, createEvent);

// event/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateEvent)
  .delete(deleteEvent);

// event/:id
router.route("/:id").get(showEvent);

module.exports = router;
