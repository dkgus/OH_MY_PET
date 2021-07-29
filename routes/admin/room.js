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

// admin/event/
router.route("/").get(isAuthenticatedUser, showAllRooms);

// admin/event/:id
router.route("/:id").get(isAuthenticatedUser, showRoom);

// admin/event/:id/edit
router
  .route("admin/:id/edit")
  .get(isAuthenticatedUser, showUpdateForm)
  .put(isAuthenticatedUser, updateRoom)
  .delete(isAuthenticatedUser, deleteRoom);

module.exports = router;
