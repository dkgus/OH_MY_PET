const User = require("../models/User");
const sendToken = require("../utils/jwtToken");




module.exports = {

    // @description    Show a update form
    // @route          GET admin/member/:id/edit
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