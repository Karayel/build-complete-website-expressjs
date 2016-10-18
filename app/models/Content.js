// load the things we need
var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs'),
	crypto = require("crypto");;

// define the schema for our user model
var contentSchema = mongoose.Schema({

    title: String,
    text: String,
    type:String,
    picture:String,
    ID:{ type: String, default: crypto.randomBytes(20).toString('hex') }
});

// create the model for content and expose it to our app
module.exports = mongoose.model('Content', contentSchema);
