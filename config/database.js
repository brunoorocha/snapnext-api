
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/snapnext');
mongoose.connect('mongodb://root:root157@ds157584.mlab.com:57584/snapnext', {
    server: {
        socketOptions: {
          socketTimeoutMS: 0,
          connectTimeoutMS: 0
        }
    }
});

module.exports = {mongoose};
