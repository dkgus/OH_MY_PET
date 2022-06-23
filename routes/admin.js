// 관리자로그인 페이지
const express = require("express");
const router = express.Router();
//const { isAuthenticatedUser } = require("../utils/auth");
const auth = require("../utils/jwtToken");

const {
  getAllUserInfo,
  getAllEventInfo,
  getAllRoomInfo,
} = require("../controller/adminController");

// admin/usersInfo
router.route("/usersInfo").get(auth, getAllUserInfo);

// admin/eventInfo
router.route("/eventInfo").get(auth, getAllEventInfo);

// admin/roomInfo
router.route("/roomInfo").get(auth, getAllRoomInfo);

module.exports = router;
