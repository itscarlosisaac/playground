const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Router = require('./Routes/Routes');

const PORT = 3000; 
const app = express();

// Opening connection with the database
var db = mongoose.connect('mongodb://localhost/dinoAPI');

app.get('/', (req, res) => {
    res.send("Hello world")
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/dinos', Router )

app.listen( PORT, () => {
    console.log('app running on port ', PORT)
})