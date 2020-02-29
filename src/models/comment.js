const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const commentSchema = new mongoose.Schema({
    parentId : {type:Number},
    parentType : {type:String},
    id: {type:Number},
    userEmail: {type:String},
    comment: {type:String},
    image: {type: String},
    regDate: {type:Date , default:Date.now},
});

// commentSchema.plugin(autoIncrement.plugin , {
//     model : 'comment',
//     field : 'id',
//     startAt : 0,
//     increment : 1
// });

module.exports = mongoose.model('comment' , commentSchema);