'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('../config/config');
var connection = mongoose.createConnection(config.dbInfo);
var crypto = require('crypto');

autoIncrement.initialize(connection);

var imageSchema = new mongoose.Schema({
    width: Number,
    height: Number
});

var memberSchema = new mongoose.Schema(_defineProperty({
    id: { type: Number, required: true, unique: true },
    userEmail: { type: String, required: true, unique: true },
    userPwd: { type: String },
    salt: { type: String },
    userNm: { type: String },
    birthday: { type: String },
    profileImage: imageSchema,
    regDate: { type: Date, default: Date.now }
}, 'salt', { type: String }));

memberSchema.plugin(autoIncrement.plugin, {
    model: 'member',
    field: 'id',
    startAt: 0,
    increment: 1
});

memberSchema.statics.findByUserEmail = function (userEmail) {
    return this.findOne({ userEmail: userEmail }).exec();
};

module.exports = mongoose.model('member', memberSchema);