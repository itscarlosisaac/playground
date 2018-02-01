const express = require('express')
const UserRouter = express.Router()
const User = require('../db/UserModel')
const bodyParser = require('body-parser')

UserRouter.route('/')
    .post((req, res, next) => {

        if (req.body.password !== req.body.passwordConf) {
            const err = new Error('Password do not match.');
            err.status = 400;
            res.send('Passwords do not match');
            return next(err);
        }

        if (req.body.username && req.body.email &&
            req.body.password && req.body.passwordConf) {

            const userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }

            User.create(userData, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });
        }
    })

module.exports = UserRouter;