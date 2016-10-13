var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var app         = express();
var dbInfo      = 'mongodb://127.0.0.1/project_base';
var mongoose    = require('mongoose').connect(dbInfo);
var db          = mongoose.connection;

// Open webserver / database connection
db.on('error', console.error.bind(console, 'Error to connect db'));
app.use(logger('dev'));
app.use(bodyParser.json());
 
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
 
// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middleware/validateRequest')]);

//app.use('/images/', express.static(path.join(__dirname,  '../images')));
app.use('/', require('./routes.js'));
//app.use(express.static(path.join(__dirname, '../dist')));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  var err = {};
  err.status = 404;
  res.json(err);
});
 

// Start the server
app.set('port', process.env.PORT || 8080);
 
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});