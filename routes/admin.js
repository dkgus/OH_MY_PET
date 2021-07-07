// 관리자로그인 페이지
const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
    showLoginForm,
    loginUser,
    logoutUser,
    deletePost,
    deleteEvent,
    deleteRoom,
  } = require("../controller/adminController");


// 관리자 권한 체크
router.use(isAuthenticatedUser);


// admin
router.route("/login").get(isAuthenticatedUser, showLoginForm).post(loginUser);

// admin/logout
router.route("/logout").get(isAuthenticatedUser, logoutUser);


//admin/delete  
router.route("/:id/postedit").delete(deletePost);
router.route("/:id/eventedit").delete(deleteEvent);
router.route("/:id/roomedit").delete(deleteRoom);


module.exports = router;
  
  