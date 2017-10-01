
var mongoose = require('mongoose');

module.exports = function(uri) {

    mongoose.connect(uri);

    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado ao banco de dados.');
    });

    mongoose.connection.on('error', function(err) {
        console.log('Mongoose! Erro na conexão.' + err);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            process.exit(0);
        });
    });
}
