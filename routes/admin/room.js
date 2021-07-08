const express = require("express");
const router = express.Router();

const {
    deleteRoom
  } = require("../../controller/adminController");




  router.route("admin/:id/edit").delete(deleteRoom);

  module.exports = router;
