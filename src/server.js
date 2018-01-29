const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Router = require('./Routes/Routes');
const UserRouter = require('./Routes/UserRouter');
const LoginRouter = require('./Routes/LoginRoutes');

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

app.get('/api/login', (req, res) => {
    res.render('login', { email: req.body ?  req.body.email : null })
});

app.get('/register', (req, res) => {
    res.render('register')
});



// Login Middleware

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
    }
  }
// app.use()

app.get('/profile' , requiresLogin , (req, res) => {
    res.render('profile')
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/dinos', Router )
app.use('/api/users', UserRouter )
app.use('/api/login', LoginRouter )




app.listen( PORT, () => {
    console.log('app running on port ', PORT)
})