const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const meetingSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  title: String,
  hostId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  startTime: { type: Date },
  endTime: { type: Date },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Meeting', meetingSchema);
