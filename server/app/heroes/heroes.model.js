'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroesSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "combo": {
        type: Array,
        required: true
    },
    "hp": {
        type: Number,
        required: true
    },
    "created_at": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Heroes', HeroesSchema);