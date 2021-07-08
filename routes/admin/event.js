const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
    deleteEvent
  } = require("../controller/adminController");


router.route("/admin/:id/edit").delete(deleteEvent);