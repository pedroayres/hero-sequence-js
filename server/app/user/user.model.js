'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "login": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "birthdate": {
        type: String,
        required: true
    },
    "nickname": {
        type: String,
        required: true
    },
    "hero": {
        type: String
    },
    "hero-combo-list": {
        type: Array
    },
    "ranking-position": {
        type: String
    },
    "achievements": {
        type: Array
    },
    "created_at": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);