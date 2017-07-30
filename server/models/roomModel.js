const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: Schema.Types.ObjectId,
  value: String,
  photo: String
});

module.exports = mongoose.model('Room', roomSchema);
