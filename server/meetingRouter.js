const util     = require('util');
const express  = require('express');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;
      
const user     = require('./models/userModel');
const room     = require('./models/roomModel');
const Meeting  = require('./models/meetingModel');

const isAuthed = require('./passport/isUserAuthed');

const meetingRouter = express.Router();

meetingRouter.get('/room/:id', (req, res) => {
    let query = {
      roomId: ObjectId(req.params.id)
    };

    Meeting.find(query)
    .populate('roomId hostId attendees').sort('startTime')
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

    Meeting.find(query)
    .populate('roomId hostId attendees').sort('startTime')
    .exec((err, meetings) => {
      if(err) res.status(500).send(err);
      if(!meetings) res.status(404).send('Meeting not found.');
      else res.json(meetings);
    });
});

meetingRouter.post('/', isAuthed, (req, res) => {

  req.checkBody("title", "Invalid title").matches("^[0-9a-zA-Z ]+$");

  req.getValidationResult().then((errors) => {
    if(!errors.isEmpty()){
      res.status(400).send('There have been validation errors:' + util.inspect(errors.array()));
      return;
    }
    let meeting = new Meeting();
        meeting.roomId = req.body.room;
        meeting.title = req.body.title;
        meeting.hostId = req.body.host;
        meeting.startTime =  new Date(req.body.startT);
        meeting.endTime = new Date(req.body.endT);
        meeting.attendees = req.body.attendees;
    // console.log(meeting);

    meeting.save(err => {
      if(err) res.status(500).send(err);
      else res.status(201).json({ message: 'Meeting created'});
    });
  });

});

meetingRouter.post('/status', (req, res) => {
  let query = {
    meetingId: ObjectId(req.body.meetingId),
    userId: req.body.userId
  }

  Meeting.findById(query.meetingId, (err, meet) => {
    if(err) res.status(500).send(err);
    if(!meet) res.status(404).send('Meeting not found.');

    let att = meet.attendees;

    //TODO: why am I using toString() ? :(
    att.find(el => el.toString() === query.userId) ?
      att.splice(att.indexOf(query.userId), 1) :
      att.push(ObjectId(query.userId));

    meet.save(err => {
        if(err) res.status(500).send(err);
        else res.status(201).send(meet);
      });

  });
});

module.exports = meetingRouter;
