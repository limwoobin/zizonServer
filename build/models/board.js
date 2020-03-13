'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

var imageSchema = new mongoose.Schema({
    width: Number,
    height: Number
});

var childCommentSchema = new mongoose.Schema({
    childCommentId: { type: Number },
    userEmail: { type: String },
    content: { type: String },
    image: { type: String },
    regDate: { type: Date, default: Date.now },
    modiDate: { type: Date, default: Date.now }
});

var commentSchema = new mongoose.Schema({
    commentId: { type: Number },
    userEmail: { type: String },
    content: { type: String },
    image: { type: String },
    childComment: childCommentSchema,
    regDate: { type: Date, default: Date.now },
    modiDate: { type: Date, default: Date.now }
});

var boardSchema = new mongoose.Schema({
    id: { type: Number }, // id
    boardType: { type: String, trim: true, required: true }, // '01 - 게시판 , 02 - 공지사항'
    userEmail: { type: String, required: true }, // 사용자 계정
    title: { type: String, required: true }, // 제목
    content: { type: String }, // 내용
    image: imageSchema,
    comment: commentSchema, // 이미지
    regDate: { type: Date, default: Date.now, required: true }, // 등록일
    modiDate: { type: Date, default: Date.now // 수정일
    } });

childCommentSchema.plugin(autoIncrement.plugin, {
    model: 'childComment',
    field: 'childCommentId',
    startAt: 0,
    increment: 1
});

commentSchema.plugin(autoIncrement.plugin, {
    model: 'comment',
    field: 'commentId',
    startAt: 0,
    increment: 1
});

boardSchema.plugin(autoIncrement.plugin, {
    model: 'board',
    field: 'id',
    startAt: 0,
    increment: 1
});

module.exports = mongoose.model('board', boardSchema);