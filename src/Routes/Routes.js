const express = require('express');
const Router = express.Router();
const Dino = require('../db/Model');
const bodyParser = require('body-parser');

const dinoController = require('../Controllers/dinoController')(Dino)
console.error( dinoController )
Router.route('/')
    .get(dinoController.get)
    .post(dinoController.post)


Router.use('/:dinoId', (req, res, next) => {
    Dino.findById(req.params.dinoId, (err, dino) => {
        err ? res.status(500).send(err) : 
        dino ? (req.dino = dino, next() ) : 
        res.status(404).send('No dino found');
    })
});



Router.route('/:dinoId')
    .get((req, res) => {
        res.json(req.dino)
    })
    .put((req, res) => {
        const {name, size, period, region, family, description} = req.body;
        req.dino.name = name;
        req.dino.size = size;
        req.dino.period = period;
        req.dino.region = region;
        req.dino.family = family;
        req.dino.description = description;
        req.dino.updatedAt = Date.now();
        req.dino.save();
        err ? res.status(500).send(err) : res.json(req.dino)
    })
    .patch((req, res) => {
        if(req.body._id) 
            delete req.body._id

        for( let key in req.body ){
            req.dino[key] = req.body[key]
        }
        req.dino.save( (err) => {
            err ? res.status(500).send(err) : res.json(req.dino)
        });
    })
    .delete((req, res) => {
        req.dino.remove((err) => {
            err ? res.status(500).send(err) : res.status(204).send("Removed")
        })
    })

module.exports = Router;