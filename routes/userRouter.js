const express = require("express");
const router = express.Router();

const {
  showAllUsers,
  showUser,
  showRegisterForm,
  registerUser,
  showUpdateForm,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// users/
router.route("/").get(showAllUsers);

// users/:id
router.route("/:id").get(showUser);

// users/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateUser)
  .delete(deleteUser);

// users/new
router.route("/new").get(showRegisterForm).post(registerUser);

module.exports = router;
