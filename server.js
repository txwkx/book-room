const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8008;
const app = express();

mongoose.connect('mongodb://localhost/bookroomAPI', (err) => {
  if(err) throw err;
});

app.get('/', (req, res) => res.send('Welcome to the "BOOK ROOM" API'));

const roomRouter = require('./server/roomRouter');
app.use('/api/rooms', roomRouter);

app.listen(port, () => console.log(`Server running on PORT: ${port}`));
