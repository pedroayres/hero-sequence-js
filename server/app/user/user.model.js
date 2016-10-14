'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "name": {
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
        type: String,
        required: true
    },
    "hero-combo-list": {
        type: Array,
        required: true
    },
    "ranking-position": {
        type: String,
        required: true
    },
    "achievements": {
        type: Array
    },
    "created_at": {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);