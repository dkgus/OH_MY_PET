const express  = require('express');
const router = express.Router();
const Event = require('../models/Event');



// @desc Index
// @route GET /event
router.get('/', async(req, res, next) => {
    const event = await Event.find({}).sort('-createdAt');    
    res.render('event/index', { event:event });
  });
  



// @desc new
// @route GET /event/new
router.get('/new', async(req, res) => {
    await res.render('event/new');
  });


// @desc create
// @route POST /event
router.post('/', async(req, res) => {
    try {
      await Event.create(req.body);
      res.redirect('/event');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


// @desc show
// @route GET /event/:id
router.get('/:id', async (req, res) => {
    try {
      const event = await Event.findOne({_id:req.params.id}, {});
      res.render('event/show', {event:event});
    } catch (err) {
      console.error(err);
    }
  });
  

  
// @desc edit
// @route GET /event/:id/edit
router.get('/:id/edit', async (req, res) => {
    try{
      const event = await  Event.findOne({_id:req.params.id}, {});
      res.render('event/edit', {event:event});
    } catch(err) {
      console.error(err);
    }
  });


  
// @desc update
// @route PUT /event/:id
router.put('/:id', async (req, res) => {
    try {
      req.body.updatedAt = Date.now();
      await Event.findOneAndUpdate({_id:req.params.id}, req.body, () => {
      res.redirect("/event/"+req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  });
  



// @desc destroy
// @route DELETE /event/:id
router.delete('/:id', async (req, res) => {
    try {
      await Event.deleteOne({_id:req.params.id}, () => {
      res.redirect('/event');
    });
    } catch (err) {
      console.error(err);
    }
  });


  module.exports = router;