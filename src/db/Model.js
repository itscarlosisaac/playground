const moongose = require('mongoose');
const Schema = moongose.Schema;

const DinoSchema = new Schema({
    id: Number,
    name: String,
    region: String,
    weight: Number,
    size: Number,
    period: String,
    family: String,
    description: String,
    createdAt: { type: Date,  default: Date.now },
    updatedAt: { type: Date,  default: Date.now }
});

const Dinosaur = moongose.model('Dinosaur', DinoSchema )


module.exports.Dino = Dinosaur;