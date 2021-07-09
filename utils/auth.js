const jwt = require("jsonwebtoken");
const user = require("../models/User");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    const msg = "로그인이 필요합니다.";
    return res.send(`<script>alert("${msg}");history.back();</script>`);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decoded.id);

  next();

  exports.isAdmin = async (req, res, next) => {
    if (!req.user.role == 0) {
      const msg = "관리자만 접근할 수 있습니다.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }

    next();
  };

  exports.isGoldMember = async (req, res, next) => {
    if (req.user.role > 1) {
      const msg = "1등급 회원만 접근할 수 있습니다.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }

    next();
  };
};
