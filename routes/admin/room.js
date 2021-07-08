const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
    deleteRoom
  } = require("../controller/adminController");




  router.route("admin/:id/edit").delete(deleteRoom);