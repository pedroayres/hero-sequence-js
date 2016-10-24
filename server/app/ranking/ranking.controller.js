'use strict';

var mongoose = require('mongoose');
var rankingModel = require('./ranking.model');
var CGED = require('../../lib/cged').CGED;

exports.create = CGED(rankingModel).create;
exports.editById = CGED(rankingModel).editById;
exports.getById = CGED(rankingModel).getById;
exports.getAll = CGED(rankingModel).getAll;
exports.deleteById = CGED(rankingModel).deleteById;