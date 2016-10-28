'use strict';

var mongoose = require('mongoose');
var userModel = require('./user.model');
var CGED = require('../../lib/cged').CGED;
var crypto = require('crypto');

exports.create = createUser;
exports.editById = CGED(userModel).editById;
exports.getById = CGED(userModel).getById;
exports.getAll = CGED(userModel).getAll;
exports.deleteById = CGED(userModel).deleteById;
exports.checkUser = checkUser;

function createUser(req, res) {
  var user = new userModel(req.body);
  var md5Pass = crypto.createHash('md5').update(user.password).digest('hex');
  user.password = md5Pass;
  userModel.findOne({ login: user.login }, function(errorLogin, someValue) {
    if(errorLogin) {
      return res.status(500).send(errorLogin);
    } else if(someValue) {
      return res.status(409).json({ "message": 'Login escolhido para o user já está em uso.' }); // Http response code 409: "Conflict"
    }

    user.save(function(err, userCriado) {
      if(err) return res.status(500).send(err);
      return res.status(201).json(userCriado);
    });
    
  });

};

function checkUser(login, password, callback) {
  var md5Pass = crypto.createHash('md5').update(password).digest('hex');
  userModel.findOne({ login: login , password: md5Pass}, function(errorLogin, user) {
    if(user === null) {
      callback({error: true});
    } else {
      callback(user);
    }
    
  });
};