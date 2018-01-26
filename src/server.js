const express = require('express');
const jsonParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();

const PORT = 3000; 
const app = express();



/*
    List of routes needed for the API
    
*/

app.get('/', (req, res) => {
    res.send("Hello world")
});


app.listen( PORT, () => {
    console.log('app running on port ', PORT)
})