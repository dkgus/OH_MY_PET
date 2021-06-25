const express  = require('express');
const router = express.Router();

const {
  showAllNotices,
  showNotice,
  showCreateForm,
  createNotice,
  showUpdateForm,
  updateNotice,
  deleteNotice,
} = require("../controller/eventController");



// event/
router.route("/").get(showAllPosts);

// event/:id
router.route("/:id").get(showPost);

// event/:id/edit
router
  .route("/:id/edit")
  .get(showUpdateForm)
  .put(updatePost)
  .delete(deletePost);

// event/new
router.route("/new").get(showCreateForm).post(createPost);

module.export = router;










// router.route("/event").get; //모든 roomReservation정보조회
// router.route("/event/:idx").get;//idx으로 조회
// router.route("/event").post;//생성
// router.route("/event/:idx").put;//수정
// router.route("/event/:idx").delete;//삭제




// //관리자
// router.route("/admin/event").get; //예약정보 조회
// router.route("/admin/event/:idx").put; //예약정보 수정
// router.route("/admin/event/:idx").delete; //예약정보 삭제



//module.exports = router;




