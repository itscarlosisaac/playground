const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    passwordConf: { type: String }
});

// Authenticate the user
UserSchema.statics.authenticate = function(email, password, callback){
    this.findOne({ email: email })
        .exec(function( err, user ){
            if(err) { 
                return callback(err) 
            } else if( !user ) {
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare( password, user.password, function( err, result ) {
                if (result === true){
                    return callback(null, user);
                }else{
                    return callback();
                }
            })
        })
}

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