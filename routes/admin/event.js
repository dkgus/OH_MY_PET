const express = require("express");
const router = express.Router();

const {
    deleteEvent
  } = require("../../controller/adminController");


router.route("/admin/:id/edit").delete(deleteEvent);

module.exports = router;
