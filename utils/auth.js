const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const msg = "로그인이 필요합니다.";
    return res.send(`<script>alert("${msg}");history.back();</script>`);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
};
