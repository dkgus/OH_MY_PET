const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  /** 헤더로부터 토큰 가져오기 */
  const token = req.header("x-auth-token");

  /** 토큰이 없는 경우 */
  if (!token) {
    return res.status(401).json({ err: "접근 권한이 없습니다" });
  }

  /**토큰 검증 */
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    console.log("req.user", req.user);
    console.log("decode", decode);
    next();
  } catch (err) {
    res.status(401).json({ msg: "토큰이 유효하지않습니다." });
  }
};
