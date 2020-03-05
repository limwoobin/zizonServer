const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

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

childCommentSchema.plugin(autoIncrement.plugin , {
    model : 'childComment',
    field : 'id',
    startAt : 0,
    increment : 1
})

module.exports = mongoose.model('childComment' , childCommentSchema);