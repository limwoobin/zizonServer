'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('../config/config');
var connection = mongoose.createConnection(config.dbInfo);

autoIncrement.initialize(connection);

var imageSchema = new mongoose.Schema({
    width: Number,
    height: Number
});

var boardSchema = new mongoose.Schema({
    boardId: { type: Number },
    userEmail: { type: String, required: true },
    boardType: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String },
    image: imageSchema,
    comments: [],
    views: { type: Number, default: 0 },
    regDate: { type: Date, default: Date.now },
    modiDate: { type: Date, default: Date.now }
});

boardSchema.plugin(autoIncrement.plugin, {
    model: 'board',
    field: 'boardId',
    startAt: 1,
    increment: 1
});

boardSchema.statics.findByBoardId = function (_id) {
    return undefined.findOne({ _id: _id }).exec();
};

module.exports = mongoose.model('board', boardSchema);