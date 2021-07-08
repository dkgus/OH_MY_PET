const express = require("express");
const router = express.Router();

const { deletePost } = require("../../controller/adminController");

router.route("/admin/:id/edit").delete(deletePost);

module.exports = router;
