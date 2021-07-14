 const User = require("../models/User");
 const Community = require("../models/Community");
 const Event = require("../models/Event");
 const Room = require('../models/Room');



 //binding for edit Controller (update & delete) 
 // (Community/Event/Room)


 module.exports = {

    /**
     * Community
     * 
     */

  // @description    Show all posts as a admin
  // @route          GET /admmin/community
  showAllPosts: async (req, res) => {
  
    const posts = await Community.find({ user: req.user._id }).populate("user");
    const user = await User.findOne({ _id: req.user._id }, {})


    res.render("admin/community/index", { posts, user });

    },

  // @description    Show a post
  // @route          GET /admin/community/:id
  showPost: async (req, res) => {
    try {
      const post = await Community.findOne({ _id: req.params.id }, {});
      res.render("admin/community/show", { post: post });
    } catch (err) {
      console.error(err);
    }
  },

  
  // @description    Show a update form
  // @route          GET /admin/community/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const post = await Community.findOne({ _id: req.params.id }, {});
      res.render("admin/community/edit", { post: post });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a post
  // @route          PUT /admin/community/:id/edit
  updatePost: async (req, res) => {
    try {
      await Community.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
        res.redirect("/admin/community/" + req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  },


  // @description    Delete a post
  // @route          DELETE /admin/community/:id/edit
  deletePost: async (req, res) => {
    try {
      await Community.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/admin/community");
      });
    } catch (err) {
      console.error(err);
    }
  },




     /**
     * Event
     * 
     */

  // @description    Show all events
  // @route          GET /admin/admin/event
  showAllEvents: async (req, res) => {
    const data = {
      addCss : ['event'],
    };
    const events = await Event.find({ user: req.user._id }).populate("user");
    const user = await User.findOne({ _id: req.user._id }, {})
    
    
    res.render("admin/event/index", { data, events , user });
  },


  // @description    Show a event
  // @route          GET /admin/event/:id
  showEvent: async (req, res) => {  
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
      const user = await User.findOne({ _id: req.user._id }, {});
      res.render("admin/event/show", { event, user });
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Show a update form
  // @route          GET /admin/event/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id }, {});
      res.render("admin/event/edit", { event: event });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a user
  // @route          PUT /admin/event/:id/edit
  updateEvent: async (req, res) => {
    try {
      await Event.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
        res.redirect("/admin/event/" + req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  },

  
  // @description    Delete a event
  // @route          DELETE admin/event/:id/edit
  deleteEvent: async (req, res) => {
    try {
      await Event.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/admin/event");
      });
    } catch (err) {
      console.error(err);
    }
  },







    /**
     * Room
     * 
     */

 // @description    Show all rooms
  // @route          GET /admin/room
  showAllRooms: async (req, res) => {
    await Room.find({})//이쯤에서.populate(참조가 필요한 document이름)-> exec
      .sort({ createdAt: -1 })
      .exec((err, rooms) => {
        res.render("admin/room/index", { rooms: rooms });
      });
  },

  // @description    Show a room
  // @route          GET /admin/room/:id
  showRoom: async (req, res) => {
    try {
      const room = await Room.findOne({ _id: req.params.id }, {});
      res.render("admin/room/show", { room: room });
                                              
                                              
    } catch (err) {
      console.error(err);
    }
  },

// @description    Show a update form
  // @route          GET /admin/room/:id/edit
  showUpdateForm: async (req, res) => {
    try {
      const room = await Room.findOne({ _id: req.params.id }, {});
      res.render("admin/room/edit", { room: room });
    } catch (err) {
      console.error(err);
    }
  },

  // @description    Update a room
  // @route          PUT /admin/room/:id/edit
  updateRoom: async (req, res) => {
    try {
      await this.deleteRoom.findOneAndUpdate({ _id: req.params.id }, req.body, () => {
        res.redirect("/admin/room/" + req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  },



  // @description    Delete a room
  // @route          DELETE admin/room/:id/edit
  deleteRoom: async (req, res) => {
    try {
      await Room.deleteOne({ _id: req.params.id }, () => {
        res.redirect("/admin/room");
      });
    } catch (err) {
      console.error(err);
    }
  },

}

