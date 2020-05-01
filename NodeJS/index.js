const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js');
var movieController = require('./controllers/movieController.js');

var app = express();
app.use(bodyParser.json());
app.use('/movie', movieController);
app.listen(3000, () => console.log('Server started at port : 3000'));


