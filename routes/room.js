const express  = require('express');
const router = express.Router();

const {
  showAllRooms,
  showRoom,
  showCreateForm,
  createRoom,
  showUpdateForm,
  updateRoom,
  deleteRoom,
} = require("../controller/roomController");



// room/
router.route("/").get(showAllRooms);

// room/:id
router.route("/:id").get(showRoom);

// room/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateRoom)
  .delete(deleteRoom);

// room/new
router.route("/new").get(showCreateForm).post(createRoom);

module.exports = router;












