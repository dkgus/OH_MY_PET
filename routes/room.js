
const express = require("express");
const router = express.Router();

const {
showAllRooms,
showRoom,
showCreateForm,
createRoom,
showUpdateForm,
updateRoom,
deleteRoom,
showRoomList,
} = require("../controller/roomController");

// room/
router.route("/").get(showAllRooms);

// room/new
router.route("/new").get(showCreateForm).post(createRoom);

// room/list
router.route("/list").get(showRoomList);

// room/:id/edit
router
.route("/:id/edit")
.get(showUpdateForm)
.put(updateRoom)
.delete(deleteRoom);

// room/:id
router.route("/:id").get(showRoom);

module.exports = router;
