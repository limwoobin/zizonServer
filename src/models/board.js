const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const boardSchema = new mongoose.Schema({
    boardId     : {type: Number},                    // id
    userEmail   : {type: String , required: true},                  // 사용자 계정
    boardType   : {type: String , required: true },                // '01 - 게시판 , 02 - 공지사항'
    title       : {type: String , required: true},                      // 제목
    content     : {type:String},                                    // 내용
    image       : imageSchema,                                        // 이미지
    comments    : [],                                              // 댓글
    views       : {type: Number , default: 0},                         // 조회수
    regDate     : {type: Date , default: Date.now },                  // 등록일
    modiDate    : {type: Date , default: Date.now }                 // 수정일
});

boardSchema.plugin(autoIncrement.plugin , {
    model       : 'board',
    field       : 'boardId',
    startAt     : 1,
    increment   : 1
});

module.exports = mongoose.model('board' , boardSchema);
