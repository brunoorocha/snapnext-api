
var mongoose = require('mongoose');
require('../config/database');

var schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' });

module.exports = mongoose.model('User', schema);
