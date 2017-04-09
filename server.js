const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 8008;
const app = express();

app.get('/', (req, res) => res.send('Welcome to the "BOOK ROOM" API'));

app.listen(port, () => console.log(`Server running on PORT: ${port}`));
