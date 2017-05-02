const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Room', roomSchema);
