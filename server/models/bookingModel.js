const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const bookingSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId },
  date: { type: Date },
  timeslots: [{
    type: String
  }]
});

//add indexing

module.exports = mongoose.model('Booking', bookingSchema);
