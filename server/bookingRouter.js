const express  = require('express');
const moment   = require('moment');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const booking = require('./models/bookingModel');

const isAuthed = require('./passport/isUserAuthed');

const bookingRouter = express.Router();

bookingRouter.get('/:id/:date', isAuthed, (req, res) => {
    let query = {
      roomId: req.params.id,
      date: {$gte: req.params.date, $lt: moment(req.params.date).add(1, 'day').toISOString() }
    };

    booking.find(query, (err, bookings) => {
      if(err) res.status(500).send(err);
      if(!bookings) res.status(404).send('Booking not found.');
      res.status(200).json(bookings);
    });

});

module.exports = bookingRouter;
