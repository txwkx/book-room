const util     = require('util');
const express  = require('express');
const mongoose = require('mongoose'),
      ObjectId = mongoose.Types.ObjectId;

const user     = require('./models/userModel');
const room     = require('./models/roomModel');
const Meeting  = require('./models/meetingModel');

const isAuthed = require('./passport/isUserAuthed');

const meetingRouter = express.Router();

meetingRouter.get('/', isAuthed, (req, res) => {

    const isRoomMode = req.query.roomId !== 'undefined';
    let query;
    if(isRoomMode){
      query = { room: ObjectId(req.query.roomId) };
    } else {
      query = { attendees: ObjectId(req.user._id) };
    }

    Meeting.find(query)
    .populate('room')
    .populate('hostId attendees', 'username')
    .sort('startTime')
    .lean()
    .exec((err, meetings) => {
      if(err) res.status(500).send(err);
      if(!meetings) res.status(404).send('Meeting not found.');
      else {

        meetings.map(el => {
          el.isHost = req.user._id.toString() === el.hostId._id.toString();
          el.status = el.attendees.filter(user => user._id.toString() === req.user._id.toString()).length > 0;
          return el;
        });

        res.json(meetings);
      }
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
        meeting.room = req.body.room;
        meeting.title = req.body.title;
        meeting.hostId = req.user._id;
        meeting.startTime =  new Date(req.body.startT);
        meeting.endTime = new Date(req.body.endT);
        meeting.attendees = [req.user._id];
    // console.log(meeting);

    meeting.save(err => {
      if(err) res.status(500).send(err);
      else res.status(201).json({ message: 'Meeting created'});
    });
  });

});

meetingRouter.post('/status', (req, res) => {
  let query = {
    meetingId: ObjectId(req.body.meetingId)
  }

  Meeting.findById(query.meetingId, (err, meet) => {
    if(err) res.status(500).send(err);
    if(!meet) res.status(404).send('Meeting not found.');

    let att = meet.attendees;

    att.find(el => el.toString() === req.user._id.toString()) ?
      att.splice(att.indexOf(req.user._id), 1) :
      att.push(ObjectId(req.user._id));

    meet.save(err => {
        if(err) res.status(500).send(err);
        else res.status(201).send(meet);
      });

  });
});

module.exports = meetingRouter;
