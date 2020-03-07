const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const childCommentSchema = new mongoose.Schema({
    boardId : {type:Number},
    boardType : {type:String},
    parentId : {type:Number},
    id : {type:Number},
    userEmail: {type:String},
    content: {type:String},
    image: {type: String},
    regDate: {type:Date , default:Date.now},
    modiDate: {type:Date , default:Date.now},
});

const commentSchema = new mongoose.Schema({
    boardId : {type:Number},
    boardType : {type:String},
    id: {type:Number},
    userEmail: {type:String},
    content: {type:String},
    image: {type: String},
    childComment : childCommentSchema,
    regDate: {type:Date , default:Date.now},
    modiDate: {type:Date , default:Date.now},
});

const boardSchema = new mongoose.Schema({
    id: {type:Number},                                       // id
    boardType : {type:String , trim:true , required:true },  // '01 - 게시판 , 02 - 공지사항'
    userEmail: {type:String , required:true},                // 사용자 계정
    title: {type:String , required:true},                    // 제목
    content: {type:String},                                  // 내용
    image: imageSchema,
    comment : commentSchema,                                      // 이미지
    regDate: {type:Date , default:Date.now , required:true}, // 등록일
    modiDate : {type:Date , default:Date.now }               // 수정일
});

commentSchema.plugin(autoIncrement.plugin , {
    model : 'comment',
    field : 'id',
    startAt : 0,
    increment : 1
});

boardSchema.plugin(autoIncrement.plugin , {
    model : 'board',
    field : 'id',
    startAt : 0,
    increment : 1
});

childCommentSchema.plugin(autoIncrement.plugin , {
    model : 'childComment',
    field : 'id',
    startAt : 0,
    increment : 1
})


module.exports = mongoose.model('board' , boardSchema);