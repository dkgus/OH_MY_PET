const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const auth = require("../utils/jwtToken");

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
router.route("/new").get(showCreateForm).post(auth, createRoom);

// room/list
router.route("/list").get(showRoomList);

// room/:id/:editId
//router.route("/:id/edit").put(updateRoom);
router.route("/edit/:editId").put(auth, updateRoom);

//room/:id/delete
router.route("/:id/delete").get(deleteRoom);

// room/:id
//router.route("/:id").get(isAuthenticatedUser, showRoom);

module.exports = router;
