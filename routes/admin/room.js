const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../../utils/auth");

const {
  showAllRooms,
  showRoom,
  showUpdateForm,
  updateRoom,
  deleteRoom,
} = require("../../controller/deleteController");

// admin/room/
router.route("/").get(isAuthenticatedUser, showAllRooms);

// admin/room/:id
router.route("/:id").get(isAuthenticatedUser, showRoom);

// admin/room/:id/edit
router.route("/:id/delete").get(deleteRoom);
// router.route("/admin/:id/edit")
// .get(isAuthenticatedUser,showUpdateForm)
// .put(isAuthenticatedUser, updateRoom)
// .delete( isAuthenticatedUser, deleteRoom);

module.exports = router;
