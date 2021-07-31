const express = require("express");
const router = express.Router();
const Community = require("../models/Community");
const Notice = require("../models/Notice");

router.get("/", async function (req, res) {
  const posts = await Community.find({});
  const notices = await Notice.find({});
  const token = req.cookies.token;

  res.render("main/index", { posts, notices, token });
});

module.exports = router;
