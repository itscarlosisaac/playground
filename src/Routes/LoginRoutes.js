const express = require('express');
const LoginRouter = express.Router();
const bodyParser = require('body-parser')
const UserModel = require('../db/UserModel')

LoginRouter.route('/')
    .post( (req, res, next) => {
        UserModel.authenticate(req.body.email, req.body.password, function(error, user){
            console.log(user)
            if( error || !user ){
                const err = new Error('Wrong email or password');
                err.status = 401;
                res.render('login')
            }else{
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        })
    })

module.exports = LoginRouter;