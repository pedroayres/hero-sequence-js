var express = require('express');
var router = express.Router();
var index = require('./lib/index');
router.get('/manager', index.renderIndex);

module.exports = router;