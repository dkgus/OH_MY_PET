const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const event = require("../models/Event");
const community = require("../models/Community");
const Room = require("../models/Room");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = {
  // @description    Show a register form
  // @route          GET /users/new
  showRegisterForm: (req, res) => {
    const data = {
      addCss: ["users"],
    };
    res.render("users/new", data);
  },

  // @description    Register a User
  // @route          POST /users/new

  registerUser: async (req, res) => {
    const { name, nickname, email, password, memPwRe, phone, type } = req.body;
    try {
      if (password.length < 5) {
        const msg = "비밀번호는 최소 5자 이상입니다.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }

      if (password !== memPwRe) {
        const msg = "비밀번호가 일치하지 않습니다.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }

      let user = await User.findOne({ email });
      if (user) {
        const msg = "이미 존재 하는 메일주소 입니다.";
        return res.send(`<script>alert("${msg}");history.back();</script>`);
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      user = new User({
        name,
        nickname,
        email,
        password: passwordHash,
        phone,
        type,
      });

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send("server error");
    }
  },

  // @description    Show a update form
  // @route          GET /users/:userid/edit
  showUpdateForm: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }, {});
      const token = req.cookies.token;

      res.render("users/edit", { user, token });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a user
  // @route          PUT /users/:id/edit
  // 회원수정

  updateUser: async (req, res) => {
    try {
      await User.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.redirect("/users/mypage");
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Delete a user
  // @route          DELETE /users/:id/edit
  deleteUser: async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/users");
      });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a Login form
  // @route          GET /users/login
  showLoginForm: (req, res) => {
    res.render("users/login", { title: "로그인" });
  },

  // @description    Login
  // @route          POST /users/login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ msg: "이메일 비밀번호를 모두 입력해주세요" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "없는 회원입니다" });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "로그인되었습니다" });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },

  // @description    Get user Info
  // @route          GET /users/login
  getUserInfo: async (req, res) => {
    try {
      console.log("1111", req.user);
      const user = await User.findById(req.user.id).select("-password");
      console.log("user", user);
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // @description    Logout
  // @route          GET /users/logout
  logoutUser: async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Logged out",
    // });
    res.redirect("/");
  },

  // @description    Show my page
  // @route          GET /users/mypage
  showMyPage: async (req, res) => {
    const token = req.cookies.token;

    const user = await User.findOne({ _id: req.user._id }, {});
    const events = await event.find({ user: req.user._id }).populate("user");
    const rooms = await Room.find({ user: req.user._id }).populate("user");
    const posts = await community.find({ user: req.user._id }).populate("user");
    res.render("users/mypage", { user, events, rooms, posts, token });
  },
};
