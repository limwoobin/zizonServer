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

var commentSchema = new mongoose.Schema({
    commentId: { type: Number },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'board', required: true },
    userEmail: { type: String },
    content: { type: String },
    image: imageSchema,
    childComments: [],
    regDate: { type: Date, default: Date.now },
    modiDate: { type: Date, default: Date.now }
});

commentSchema.plugin(autoIncrement.plugin, {
    model: 'comment',
    field: 'commentId',
    startAt: 0,
    increment: 1
});

module.exports = mongoose.model('comment', commentSchema);