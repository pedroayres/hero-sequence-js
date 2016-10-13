'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "title": {
        type: String,
        required: true
    },
    "x": {
        type: String,
        required: true
    },
    "y": {
        type: String,
        required: true
    },
    "members": {
        type: Array
    },
    "created_at": {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('Case', CaseSchema);