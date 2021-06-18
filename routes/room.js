const express  = require('express');
const router = express.Router();
const Room = require('../models/Room');



// @desc Index
// @route GET /room
router.get('/', async(req, res, next) => {
    const room = await Room.find({}).sort('-createdAt');    
    res.render('room/index', { room:room });
  });
  



// @desc new
// @route GET /room/new
router.get('/new', async(req, res) => {
    await res.render('room/new');
  });


// @desc create
// @route POST /room
router.post('/', async(req, res) => {
    try {
      await Room.create(req.body);
      res.redirect('/room');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


// @desc show
// @route GET /room/:id
router.get('/:id', async (req, res) => {
    try {
      const room = await Room.findOne({_id:req.params.id}, {});
      res.render('room/show', {room:room});
    } catch (err) {
      console.error(err);
    }
  });
  

  
// @desc edit
// @route GET /room/:id/edit
router.get('/:id/edit', async (req, res) => {
    try{
      const room = await  Room.findOne({_id:req.params.id}, {});
      res.render('room/edit', {room:room});
    } catch(err) {
      console.error(err);
    }
  });


  
// @desc update
// @route PUT /room/:id
router.put('/:id', async (req, res) => {
    try {
      req.body.updatedAt = Date.now();
      await Room.findOneAndUpdate({_id:req.params.id}, req.body, () => {
      res.redirect("/room/"+req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  });
  



// @desc destroy
// @route DELETE /room/:id
router.delete('/:id', async (req, res) => {
    try {
      await Room.deleteOne({_id:req.params.id}, () => {
      res.redirect('/room');
    });
    } catch (err) {
      console.error(err);
    }
  });


  module.exports = router;