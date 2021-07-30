const User = require("../models/User");




module.exports = {
  // @description    Show all users 전체 유저 조회
  // @route          GET /admin/member
  showAllUsers: async (req, res) => {
    const users = await User.find().sort({ username: 1 });
    res.render("admin/member/index", { users });
  },

  // @description    Show a user 
  // @route          GET /admin/member/:id 
  // 회원 개별 조회페이지

  showUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }, {});
      res.render("admin/member/show", { user });
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  },


    // @description    Show a update form
    // @route          GET /admin/member/:id/edit
    showUpdateForm: async (req, res) => {
        try {
          const user = await User.findOne({ _id: req.params.id }, {});
          res.render("admin/member/edit", { user : user });
        } catch (err) {
          console.error(err);
        }
      },
    

    // @description    Update a user as a admin
    // @route          PUT /admin/member/:id/edit
    updateUser: async (req, res) => {
        try {
          await User.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
            res.redirect("/admin/member/" + req.params.id);
          });
        } catch (err) {
          console.error(err);
        }
      },
    

    // @description    Delete a user as a admin
    // @route          DELETE /admin/member/:id/edit
    deleteUser:async (req, res) => {
        try {
          await User.deleteOne({ _id: req.params.id }, () => {
            res.redirect("/admin/member");
          });
        } catch (err) {
          console.error(err);
        }
      },
}