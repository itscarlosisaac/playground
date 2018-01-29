const express = require('express')
const UserRouter = express.Router()
const UserModel = require('../db/UserModel')
const bodyParser = require('body-parser')

UserRouter.route('/')
    .get( (req, res) => {
        const query = req.query
        UserModel.find(query, (err, users) => {
            err ? res.status(500).send(err) : res.json(users)
        });
    })
    
    .post( (req, res, next) => {
        
        if ( req.body.password !== req.body.passwordConf ){
            const err = new Error('Password do not match.');
            err.status = 400;
            res.send('Passwords do not match');
            return next(err);
        }

        if( req.body.username && req.body.email &&
            req.body.password && req.body.passwordConf ){
            
            const userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }
            
            UserModel.create( userData, (error, user) => {
                error ? next(error) : (
                    // req.session.userId.id,
                    res.status(201),
                    res.send(user)
                )
            });
        }   
    })

module.exports = UserRouter;