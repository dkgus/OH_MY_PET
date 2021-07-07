const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");

const {
} = require("../controller/communityController");


// community/:id/edit
router
.route("/:id/edit")
.delete(deleteCommunity);

module.exports = router;
