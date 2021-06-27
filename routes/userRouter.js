const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
  showAllUsers,
  showUser,
  showRegisterForm,
  registerUser,
  showUpdateForm,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

// users/
router.route("/").get(showAllUsers);

// users/:id
router.route("/:id").get(isAuthenticatedUser, showUser);

// users/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updateUser)
  .delete(deleteUser);

// users/new
router.route("/new").get(showRegisterForm).post(registerUser);

// users/login
router.route("/login").post(loginUser);

module.exports = router;
