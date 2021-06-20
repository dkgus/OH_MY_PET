const express  = require('express');
const router = express.Router();


router.route("/reservation").get; //모든 roomReservation정보조회
router.route("/reservarion/:idx").get;//idx으로 조회
router.route("/reservation").post;//생성
router.route("/reservarion/:idx").put;//수정
router.route("/reservarion/:idx").delete;//삭제




//관리자
router.route("/admin/reservation").get; //예약정보 조회
router.route("/admin/reservation/:idx").put; //예약정보 수정
router.route("/admin/reservation/:idx").delete; //예약정보 삭제



module.exports = router;




