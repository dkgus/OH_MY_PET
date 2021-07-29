const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../../utils/auth");

const {
  showUpdateForm,
  updateUser,
  deleteUser,
} = require("../../controller/adminUserController");

// admin/member/:id/edit (회원 정보 수정)
router
  .route("/member/:id/edit")
  .get(isAuthenticatedUser, showUpdateForm)
  .put(isAuthenticatedUser, updateUser)
  .delete(isAuthenticatedUser, deleteUser);

module.exports = router;
