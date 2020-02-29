const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const boardSchema = new mongoose.Schema({
    id: {type:Number},
    boardType : {type:String},
    userEmail: {type:String},
    title: {type:String},
    content: {type:String},
    image: {type: String},
    comment: {type:String},
    regDate: {type:Date , default:Date.now},
});

boardSchema.plugin(autoIncrement.plugin , {
    model : 'board',
    field : 'id',
    startAt : 0,
    increment : 1
});

module.exports = mongoose.model('board' , boardSchema);