'use strict';

var mongoose = require('mongoose');
var CaseModel = require('./case.model');
var CGED = require('../../lib/cged').CGED;

exports.create = CGED(CaseModel).create;
exports.editById = CGED(CaseModel).editById;
exports.getById = CGED(CaseModel).getById;
exports.getAll = CGED(CaseModel).getAll;
exports.deleteById = CGED(CaseModel).deleteById;