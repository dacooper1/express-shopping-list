const express = require('express');
const routes = require('./routes')
const MyError = require('./myErrors')
const app = express();
app.use(express.json());


app.use('/items', routes)

module.exports = app

