const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const auth = require("../utils/jwtToken");

const {
  showAllEvents,
  showEvent,
  showCreateForm,
  createEvent,
  showUpdateForm,
  updateEvent,
  deleteEvent,
  showDetailForm,
  getEventInfo,
} = require("../controller/eventController");

// event/
router.route("/").get(isAuthenticatedUser, showAllEvents);

// event/new
router.route("/new").post(auth, createEvent);

//event/getInfo
router.route("/getInfo").get(auth, getEventInfo);

// event/:id/edit(update)
router.route("/:id/edit").get(showUpdateForm).post(updateEvent);

//event/:id/delete
router.route("/:id/delete").get(deleteEvent);

// event/:id
router.route("/:id").get(isAuthenticatedUser, showEvent);

module.exports = router;
