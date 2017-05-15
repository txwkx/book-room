const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8008;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bookroomAPI', (err) => {
  if(err) throw err;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.send('Welcome to the "BOOK ROOM" API'));

const roomRouter = require('./server/roomRouter');
app.use('/api/rooms', roomRouter);

const meetingRouter = require('./server/meetingRouter');
app.use('/api/meetings', meetingRouter);

app.listen(port, () => console.log(`Server running on PORT: ${port}`));
