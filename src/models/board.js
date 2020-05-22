const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const boardSchema = new mongoose.Schema({
    boardId     : {type: Number},
    userEmail   : {type: String , required: true},
    boardType   : {type: String , required: true },
    title       : {type: String , required: true},
    content     : {type: String},
    image       : imageSchema,
    comments    : [],
    views       : {type: Number , default: 0},
    regDate     : {type: Date , default: Date.now },
    modiDate    : {type: Date , default: Date.now }
});

boardSchema.plugin(autoIncrement.plugin , {
    model       : 'board',
    field       : 'boardId',
    startAt     : 1,
    increment   : 1
});

boardSchema.statics.findByBoardId = function(_id){
    return this.findOne({_id}).exec();
}

module.exports = mongoose.model('board' , boardSchema);