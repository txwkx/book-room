const express = require('express');
const mongoose = require('mongoose');

//Model
const userMeetingSchema = new mongoose.Schema({
  userId: Number,
  meetingsList: [{
    date: { type: Date },
    meetings: [{
      room: String,
      title: String,
      host: String,
      status: { type: Boolean, default: true }
    }]
  }]
});

const UserMeeting = mongoose.model('usermeeting', userMeetingSchema);

const userMeetingRouter = express.Router();

userMeetingRouter.get('/user/:id', (req, res) => {
    let query = {
      userId: req.params.id
    };

    UserMeeting.find(query, (err, meetings) => {
      if(err) res.status(500).send(err);
      if(!meetings) res.status(404).send('User meetings not found.');
      else res.json(meetings[0].meetingsList);
    });
});

module.exports = userMeetingRouter;
