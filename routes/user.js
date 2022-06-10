const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const { checkRegister } = require("../utils/checkInfo");
const auth = require("../utils/jwtToken");

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
  getUserInfo,
  showMyPageTwo,
} = require("../controller/userController");

// users/
//router.route("/").get(showAllUsers);

// users/new
router.route("/new").post(checkRegister, registerUser); //get token

// user/login(get)
router.route("/login").get(auth, getUserInfo);

// users/login(post)
router.route("/login").post(loginUser);

// users/logout
router.route("/logout").get(logoutUser);

// users/mypage
router.route("/mypage").get(auth, showMyPage);

//
router.route("/mypage_test/:id").get(auth, showMyPageTwo);

// users/:id/edit
router.route("/:id").get(showUpdateForm).post(updateUser).delete(deleteUser);

// users/:id
// router.route("/:id").get(showUser);

module.exports = router;
