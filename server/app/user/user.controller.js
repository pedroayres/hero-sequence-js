'use strict';

var mongoose = require('mongoose');
var userModel = require('./user.model');
var CGED = require('../../lib/cged').CGED;

exports.create = CGED(userModel).create;
exports.editById = CGED(userModel).editById;
exports.getById = CGED(userModel).getById;
exports.getAll = CGED(userModel).getAll;
exports.deleteById = CGED(userModel).deleteById;