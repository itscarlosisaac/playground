const moongose = require('mongoose');
const Schema = moongose.Schema;

const dinoModel = new Schema({
    id: { type: Number },
    name: { type: String },
    region: { type: String },
    weight: { type: Number },
    size: { type: Number },
    period: { type: String },
    family: { type: String },
    description: { type: String },
    createdAt: { type: Date,  default: Date.now },
    updatedAt: { type: Date,  default: Date.now }
});

module.exports = moongose.model('Dino', dinoModel )

