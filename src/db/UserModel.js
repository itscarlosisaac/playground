const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    passwordConf: { type: String }
});


UserSchema.pre('save', function( next ) {
    // Encrypt password 
    bcrypt.hash( this.password, 10, (err, hash) => {
        err ? next(err) : (
            this.password = hash,
            next()
        )
    });
});

module.exports = mongoose.model('User', UserSchema );