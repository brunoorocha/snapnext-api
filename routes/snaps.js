var express = require('express');
var router = express.Router();

var snap_controller = require('../controllers/snapController');

// GET snaps listing
router.get('/', snap_controller.listAll);

// GET snaps coordinates listing
router.get('/markers', snap_controller.markers);

// GET snap by id
router.get('/:id', snap_controller.snapById);

// POST new snap
router.post('/', snap_controller.add);

// DELETE a snap
router.delete('/:id', snap_controller.remove);

module.exports = router;
