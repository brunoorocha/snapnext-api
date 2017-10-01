
var Snap = require('../models/snap');
var fs   = require('fs');

exports.markers = function(req, res) {
    Snap.find({})
        .select('_id lat lng')
        .exec(function(err, snaps) {
            if(err) {
                res.status(500).json({ error: err.message });
                res.end();
                return;
            }

            if(!snaps || snaps == null) {
                res.status(204);
                res.end();
                return;
            }

            res.json(snaps);
            res.end();
        });
}

exports.listAll = function(req, res) {
    Snap.find({})    
        .exec(function(err, snaps) {
            if(err) {
                res.status(500).json({ error: err.message });
                res.end();
                return;
            }

            if(!snaps || snaps == null) {
                res.status(204);
                res.end();
                return;
            }

            res.json(snaps);
            res.end();
        });
}

exports.snapById = function(req, res) {
    Snap.findOne({ _id: req.params.id })
        .exec(function(err, snap) {
            if(err) {
                res.status(500).json({ error: err.message });
                res.end();
                return;
            }

            if(!snap || snap == null) {
                res.status(204);
                res.end();
                return;
            }

            res.json(snap);
            res.end();
        });
}

exports.add = function(req, res) {
    var imageURI       = "snap_"+ req.body.userId +"_"+ Date.now() +".png";
    var imageBinBuffer = new Buffer(req.body.image, 'base64').toString('binary');
    var imageURL       = req.protocol +"://"+ req.get('host') + "/media/"+ imageURI;

    fs.writeFile(('./public/images/snaps/'+ imageURI), imageBinBuffer, 'binary', function(err) {
        if(err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
    });

    var newSnap = new Snap({
        imageURL: imageURL,
        lat: req.body.lat,
        lng: req.body.lng,
        subtitle: req.body.subtitle,
        userId: req.body.userId,
    });

    newSnap.save(function(err) {
        if(err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }

        res.json(newSnap);
        res.end();
    });
}

exports.remove = function(req, res) {
    Snap.find({ _id: req.params.id })
        .remove(function(err) {
            if(err) {
                res.status(500).json({ error: err.message });
                res.end();
                return;
            }

            res.json({ success: true });
            res.end();
        });
}
