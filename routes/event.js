const express  = require('express');
const router = express.Router();

const {
  showAllEvents,
  showEvent,
  showCreateForm,
  createEvent,
  showUpdateForm,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");



// event/
router.route("/").get(showAllEvents);


// event/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateEvent)
  .delete(deleteEvent);
  
  // event/new
  router.route("/new").get(showCreateForm).post(createEvent);
  
  // event/:id
  router.route("/:id").get(showEvent);

  module.exports = router;
  