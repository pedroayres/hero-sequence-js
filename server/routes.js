var express 	= require('express');
var router 		= express.Router();
var auth 		= require('./lib/auth');
var user 		= require('./app/user/user.controller');
var cases 		= require('./app/case/case.controller');


// Routes that can be accessed by any one
//router.get('/', index.renderIndex);
// LOGIN
router.post('/login', auth.login);
// USER
router.get('/user', user.getAll);
// CASE
router.get('/case', cases.getAll);
router.post('/case', cases.create);

// Routes that can be accessed only by autheticated users
/* router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete); */
// Routes that can be accessed only by authenticated & authorized users
/* router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete); */

module.exports = router;