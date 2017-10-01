var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController.js');


// GET users listing.
router.get('/', user_controller.listAll);

// GET users listing.
router.get('/:id', user_controller.userById);

// POST user add
router.post('/', user_controller.add);

// POST user auth
router.post('/auth', user_controller.auth);

module.exports = router;
