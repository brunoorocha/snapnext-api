
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/snapnext');
mongoose.connect('mongodb://root:root157@ds157584.mlab.com:57584/snapnext');

module.exports = {mongoose};

//  function(uri) {
//
//     mongoose.connect(uri);
//
//     mongoose.connection.on('connected', function() {
//         console.log('Mongoose! Conectado ao banco de dados.');
//     });
//
//     mongoose.connection.on('error', function(err) {
//         console.log('Mongoose! Erro na conexão.' + err);
//     });
//
//     process.on('SIGINT', function() {
//         mongoose.connection.close(function() {
//             process.exit(0);
//         });
//     });
// }
