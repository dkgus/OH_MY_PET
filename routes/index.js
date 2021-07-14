const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Community = require("../models/Community");
const Notice = require("../models/Notice");




router.get("/", async function(req, res){
    const posts = await Community.find({});
    const notices = await Notice.find({});
    const user = await User.find({})

   
    res.render("main/index",{ posts,notices,user });
});


module.exports = router;
