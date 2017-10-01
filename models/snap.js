
var mongoose = require('mongoose');
require('../config/database');

var schema = mongoose.Schema({
    imageURL: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    subtitle: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date,
        default: new Date( + new Date() + 24*60*60*1000)
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
}, { collection: 'snaps' });

module.exports = mongoose.model('Snap', schema);
