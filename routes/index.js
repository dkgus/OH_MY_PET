const express = require('express');
const router = express.Router();

router.get("/", async (req, res, next) => {
	const data = {
        addCss : ['main'],
        addScript : ['main'],
    }
    return res.render("main/index", data);

});

module.exports = router;
