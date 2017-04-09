const express = require('express');
const mongoose = require('mongoose');

//Model
const roomSchema = new mongoose.Schema({ name: String, title: String });
const Room = mongoose.model('Room', roomSchema);

const roomRouter = express.Router();

roomRouter.route('/')
  .get((req, res) => {

    let query = {};

    Room.find(query, (err, rooms) => {
      if(err) res.status(500).send(err);
      else res.json(rooms);
    });
  });

module.exports = roomRouter;
