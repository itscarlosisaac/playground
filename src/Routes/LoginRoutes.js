const express = require('express');
const LoginRouter = express.Router();
const bodyParser = require('body-parser')

LoginRouter.route('/')
    .post( (req, res) => {
        const { username, password } = req.body;
        res.send( password )
    })

module.exports = LoginRouter;