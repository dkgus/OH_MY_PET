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
  loginUser,
  logoutUser,
  showLoginForm,
  showMyhomeForm,
} = require("../controller/userController");

// users/
router.route("/").get(showAllUsers);

// users/new
router.route("/new").get(showRegisterForm).post(registerUser);

// users/login
router.route("/login").get(showLoginForm).post(loginUser);

// users/logout
router.route("/logout").post(logoutUser);

// users/mypage
router.route("/mypage");


// users/:id/edit
router
.route("/:id/edit")
.get(showUpdateForm)
.put(updateUser)
.delete(deleteUser);


// users/:id
router.route("/:id").get(showMyhomeForm);


module.exports = router;