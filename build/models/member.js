'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

var memberSchema = new mongoose.Schema(_defineProperty({
    id: { type: Number, required: true, unique: true },
    userEmail: { type: String, required: true, unique: true },
    userPwd: { type: String },
    salt: { type: String },
    userNm: { type: String },
    birthday: { type: String },
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

memberSchema.statics.findByUserEmailOrUserNm = function (userEmail) {
    return this.findOne({ userEmail: userEmail }).exec();
};

module.exports = mongoose.model('member', memberSchema);