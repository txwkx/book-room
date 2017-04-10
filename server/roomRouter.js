const express = require('express');
const mongoose = require('mongoose');

//Model
const roomSchema = new mongoose.Schema({ name: String, title: String });
const Room = mongoose.model('Room', roomSchema);

const roomRouter = express.Router();

roomRouter.get('/', (req, res) => {
    let query = {};

    Room.find(query, (err, rooms) => {
      if(err) res.status(500).send(err);
      else res.json(rooms);
    });
  });

roomRouter.get('/:id', (req, res) => {
    Room.findById(req.params.id, (err, room) => {
      if(err) res.status(500).send(err);
      if(!room) res.status(404).send('Room not found.');
      res.status(200).json(room);
    });
  });

module.exports = roomRouter;
