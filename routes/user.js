const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const { checkRegister } = require("../utils/checkInfo");

const {
  //showAllUsers,
  //showUser,
  showRegisterForm,
  registerUser,
  showUpdateForm,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  showLoginForm,
  showMyPage,
  goHome,
} = require("../controller/userController");

// users/
//router.route("/").get(showAllUsers);

// users/new
router.route("/new").get(showRegisterForm).post(checkRegister, registerUser);

// users/login
router.route("/login").get(showLoginForm).post(loginUser);

// users/logout
router.route("/logout").get(logoutUser);

// users/mypage
router.route("/mypage").get(isAuthenticatedUser, showMyPage);

// users/:id/edit
router.route("/:id").get(showUpdateForm).post(updateUser).delete(deleteUser);

// users/:id
// router.route("/:id").get(showUser);

module.exports = router;
