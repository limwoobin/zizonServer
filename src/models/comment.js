const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const commentSchema = new mongoose.Schema({
    commentId: {type:Number},
    board:{type:mongoose.Schema.Types.ObjectId, ref:'board' , required:true},
    userEmail: {type:String},
    content: {type:String},
    image: imageSchema,
    regDate: {type:Date , default:Date.now},
    modiDate: {type:Date , default:Date.now},
},{
    toObject:{virtuals:true}
});


commentSchema.virtual('childComments')
    .get(function(){
        return this._childComments;
    })
    .set(function(value){
        this._childComments = value;
    })

commentSchema.plugin(autoIncrement.plugin , {
    model : 'comment',
    field : 'commentId',
    startAt : 0,
    increment : 1
});

module.exports = mongoose.model('comment' , commentSchema);