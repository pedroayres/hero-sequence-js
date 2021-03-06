var express = require('express');
var router = express.Router();
var auth = require('./lib/auth');
var index = require('./lib/index');
var heroes = require('./app/heroes/heroes.controller');
var ranking = require('./app/ranking/ranking.controller');
var user = require('./app/user/user.controller'); 

// Heroes routes
router.get('/heroes', heroes.getAll);
router.get('/heroes/:id', heroes.getById);
router.post('/heroes', heroes.create);
router.put('/heroes', heroes.editById);
router.delete('/heroes/:id', heroes.deleteById);

// Ranking routes
router.get('/ranking', ranking.getAll);
router.get('/ranking/:id', ranking.getById);
router.post('/ranking', ranking.create);
router.put('/ranking', ranking.editById);
router.delete('/ranking/:id', ranking.deleteById);

// User routes
router.get('/user', user.getAll);
router.get('/user/:id', user.getById);
router.post('/user', user.create);
router.put('/user', user.editById);
router.delete('/user/:id', user.deleteById);

// Login route
router.post('/login', auth.login);


module.exports = router;