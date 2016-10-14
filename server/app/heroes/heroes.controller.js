'use strict';

var mongoose = require('mongoose');
var heroesModel = require('./heroes.model');
var CGED = require('../../lib/cged').CGED;

exports.create = CGED(heroesModel).create;
exports.editById = CGED(heroesModel).editById;
exports.getById = CGED(heroesModel).getById;
exports.getAll = CGED(heroesModel).getAll;
exports.deleteById = CGED(heroesModel).deleteById;