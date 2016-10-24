var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var index = require('./lib/index');
var heroes = require('./app/heroes/heroes.controller');
var ranking = require('./app/ranking/ranking.controller');
var user = require('./app/user/user.controller'); 

// Render index page
router.get('/manager', index.renderIndex);

// Heroes routes
router.get('/heroes', heroes.getAll);
router.get('/heroes', heroes.getById);
router.post('/heroes', heroes.create);
router.put('/heroes', heroes.editById);
router.delete('/heroes', heroes.deleteById);

// Ranking routes
router.get('/ranking', ranking.getAll);
router.get('/ranking', ranking.getById);
router.post('/ranking', ranking.create);
router.put('/ranking', ranking.editById);
router.delete('/ranking', ranking.deleteById);

// User routes
router.get('/user', user.getAll);
router.get('/user', user.getById);
router.post('/user', user.create);
router.put('/user', user.editById);
router.delete('/user', user.deleteById);

// Login route
router.post('/login', auth.login);


module.exports = router;