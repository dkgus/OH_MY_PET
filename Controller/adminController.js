const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const Community = require("../models/Community");
const Event = require("../models/Event");
const Room = require('../models/Room');


module.exports = {
  // @description    Show a admin Login form
  // @route          GET /admin
  showLoginForm: (req, res) => {
    const token = req.cookies.token

    

   return res.render("admin/login", {token});
  },


  // @description    admin Login
  // @route          POST /admin
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;

    // 이메일, 비밀번호 입력되었는지 확인
    if (!email || !password) {
      const msg = "이메일, 비밀번호 모두 입력해주세요.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }

    // DB에 유저 아이디가 있는지 확인
    const user = await User.findOne({ email });

    if (!user) {
      const msg = "존재하지 않는 이메일 입니다.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }

    // 비밀번호가 일치하는지 확인
    const isPasswordMatched = async () => {
      await bcrypt.compare(password, user.password);
    };

    if (!isPasswordMatched) {
      const msg = "올바른 비밀번호를 입력해주세요.";
      return res.send(`<script>alert("${msg}");history.back();</script>`);
    }

    sendToken(user, res);
  },


  // @description    adminLogout
  // @route          GET /admin/logout
  logoutUser: async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.redirect("/");
  },


};


 