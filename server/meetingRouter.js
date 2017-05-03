const express = require('express');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;
const user = require('./models/userModel');
const room = require('./models/roomModel');
const meeting = require('./models/meetingModel');

const meetingRouter = express.Router();

meetingRouter.get('/room/:id', (req, res) => {
    let query = {
      roomId: ObjectId(req.params.id)
    };

    meeting.find(query)
    .populate('roomId')
    .populate('hostId')
    .populate('attendees')
    .exec((err, meetings) => {
      if(err) res.status(500).send(err);
      if(!meetings) res.status(404).send('Meeting not found.');
      else res.json(meetings);
    });
});


meetingRouter.get('/user/:id', (req, res) => {
    let query = {
      attendees: ObjectId(req.params.id)
    };

    meeting.find(query)
    .populate('roomId')
    .populate('hostId')
    .populate('attendees')
    .exec((err, meetings) => {
      if(err) res.status(500).send(err);
      if(!meetings) res.status(404).send('Meeting not found.');
      else res.json(meetings);
    });
});


module.exports = meetingRouter;
