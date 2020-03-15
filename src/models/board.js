const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const childCommentSchema = new mongoose.Schema({
    childCommentId : {type:Number , unique:true},
    userEmail: {type:String},
    content: {type:String},
    image: {type: String},
    regDate: {type:Date , default:Date.now},
    modiDate: {type:Date , default:Date.now},
});

const commentSchema = new mongoose.Schema({
    commentId: {type:Number , unique:true},
    userEmail: {type:String},
    content: {type:String},
    image: {type: String},
    childComment : [childCommentSchema],
    regDate: {type:Date , default:Date.now},
    modiDate: {type:Date , default:Date.now},
});

const boardSchema = new mongoose.Schema({
    boardId: {type:Number , required:true},        // id
    userEmail: {type:String , required:true},                     // 사용자 계정
    boardType : {type:String , required:true },                   // '01 - 게시판 , 02 - 공지사항'
    title: {type:String , required:true},                         // 제목
    content: {type:String},                                       // 내용
    image: imageSchema,                                        // 이미지
    comment : [commentSchema],                                 // 코멘트
    regDate: {type:Date , default:Date.now },                     // 등록일
    modiDate : {type:Date , default:Date.now }                 // 수정일
});

childCommentSchema.plugin(autoIncrement.plugin , {
    model : 'childComment',
    field : 'childCommentId',
    startAt : 0,
    increment : 1
})

commentSchema.plugin(autoIncrement.plugin , {
    model : 'comment',
    field : 'commentId',
    startAt : 0,
    increment : 1
});

boardSchema.plugin(autoIncrement.plugin , {
    model : 'board',
    field : 'boardId',
    startAt : 0,
    increment : 1
});

// module.exports = mongoose.model('childComment' , childCommentSchema);
// module.exports = mongoose.model('comment' , commentSchema);
module.exports = mongoose.model('board' , boardSchema);
