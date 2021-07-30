const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../../utils/auth");


const {
    showAllUsers,
    showUser,
    showUpdateForm,
    updateUser,
    deleteUser
  } = require("../../controller/adminUserController");


// admin/member (회원 전체조회)
router.route("/").get(isAuthenticatedUser, showAllUsers);

// admin/member/:id (회원 개인 조회)
router.route("/:id").get(isAuthenticatedUser, showUser);


// admin/member/:id/edit (회원 정보 수정)
router
.route("/:id/edit")
.get( isAuthenticatedUser, showUpdateForm)
.put( isAuthenticatedUser, updateUser)
.delete( isAuthenticatedUser, deleteUser);


module.exports = router;