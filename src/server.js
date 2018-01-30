const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const User = require('./db/UserModel');

// Constants
const PORT = 3000;

// router files
const Router = require('./Routes/Routes');
const RegisterRouter = require('./Routes/RegisterRouter');
const LoginRouter = require('./Routes/LoginRoutes');

// Opening connection with the database
mongoose.connect('mongodb://localhost/auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    // we're connected!
});


// Using sessions
app.use(session({
    secret: 'hello',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

// Views
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')


app.get('/login', (req, res) => {
    res.render('login')
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
        res.send(err);
        return next(err);
    }
}

app.get('/profile', requiresLogin, (req, res) => {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error)
            } else {
                if (user === null) {
                    const err = new Error('Not authorizad! Go Back');
                    err.status = 400;
                    return next(err)
                } else {
                    res.render('profile', {
                        username: user.username,
                        email: user.email
                    })
                }
            }
        })
})

app.get('/logout', (req, res, next) => {
    if( req.session ){
        req.session.destroy( (err)  => {
            if( err ){
                return next(err)
            }else{
                return res.redirect('/login');
            }
        })
    }
})

app.use(bodyParser.urlencoded({ extended: true }) )
app.use(bodyParser.json())

app.use('/register', RegisterRouter)
app.use('/login', LoginRouter)

app.listen(PORT, () => {
    console.log('app running on port ', PORT)
})