const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Router = require('./Routes/Routes');
const path = require('path');

const PORT = 3000; 
const app = express();

// Opening connection with the database
var db = mongoose.connect('mongodb://localhost/dinoAPI');

// Views
app.set('views', path.join(__dirname, "views") )
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/dinos', Router )

app.listen( PORT, () => {
    console.log('app running on port ', PORT)
})