'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RankingSchema = new Schema({
    "top10": {
        type: Array
    },
    "date": {
        type: Date
    },
    "created_at": {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Ranking', RankingSchema);