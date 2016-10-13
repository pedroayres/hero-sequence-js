'use strict';

var mongoose = require('mongoose');
var UserModel = require('./user.model');
var CGED = require('../../lib/cged').CGED;

exports.create = CGED(UserModel).create;
exports.editById = CGED(UserModel).editById;
exports.getById = CGED(UserModel).getById;
exports.getAll = CGED(UserModel).getAll;
exports.deleteById = CGED(UserModel).deleteById;