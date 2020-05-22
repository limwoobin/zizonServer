const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.dbInfo);

autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const commentSchema = new mongoose.Schema({
    commentId       : {type: Number},
    board           : {type: mongoose.Schema.Types.ObjectId, ref: 'board' , required: true},
    userEmail       : {type: String},
    content         : {type: String},
    image           : imageSchema,
    childComments   : [],
    regDate         : {type: Date , default: Date.now},
    modiDate        : {type: Date , default: Date.now},
})

commentSchema.plugin(autoIncrement.plugin , {
    model       : 'comment',
    field       : 'commentId',
    startAt     : 0,
    increment   : 1
});

module.exports = mongoose.model('comment' , commentSchema);