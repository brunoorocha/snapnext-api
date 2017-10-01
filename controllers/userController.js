
var User = require('../models/user');

exports.listAll = function(req, res) {
    User.find({}).exec(function(err, users) {        
        res.json(users);
        res.end();
    });
}

exports.userById = function(req, res) {
    User.find({ _id: req.params.id }).exec(function(err, user) {
        if(!user || user == null) {
            res.status(404).json({ error: 'User not found!' });
            res.end();
            return;
        }

        res.json(user);
        res.end();
    });
}

exports.add = function(req, res) {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err) {
        if(err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }

        res.json(newUser);
        res.end();
    });
}

exports.remove = function(req, res) {

}

exports.auth = function(req, res) {

    User.findOne({ username: req.body.username })
    .exec(function(err, user) {

        if(err){
            res.status(401).json(err);
            res.end();
        }

        if(!user) {
            res.status(401).json({ msg: "Authentication failed! User not found." });
            res.end();
            return;
        }

        if(user.password != req.body.password){
            res.status(401).json({ msg: "Authentication failed! Wrong password." });
            res.end();
            return;
        }

        res.status(200).json(user);
        res.end();
    });
}
