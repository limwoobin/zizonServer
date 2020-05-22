const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const postSchema = new mongoose.Schema({
    postId      : {type: Number},
    userEmail   : {type: String , required: true},
    postType    : {type:String , required: true},
    title       : {type: String , required: true},
    content     : {type: String},
    comments    : [],
    views       : {type: Number , default: 0},
    regDate     : {type: Date , default: Date.now},
    modiDate    : {type: Date , default: Date.now}
});


postSchema.plugin(autoIncrement.plugin , {
    model     : 'post',
    field     : 'postId',
    startAt   : 1,
    increment : 1
});

module.exports = mongoose.model('post' , postSchema);