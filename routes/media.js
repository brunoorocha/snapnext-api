var express = require('express');
var router  = express.Router();
var fs      = require('fs');

/* GET home page. */
router.get('/:imgURI', function(req, res, next) {
    var img = fs.readFile(('./public/images/snaps/'+ req.params.imgURI), function(err, image) {
        if(err) {
            res.json({ error: err.message });
            res.end();
            return;
        }

        res.writeHead(200, {'Content-type': 'image/png'});
        res.end(image);
    });
});


module.exports = router;
