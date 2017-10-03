var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title : 'Snapnext'});
    res.end();
});

router.get('/auth', function(req, res, next) {
    res.render('login', { title: 'Snapnext' });
    res.end();
});

module.exports = router;
