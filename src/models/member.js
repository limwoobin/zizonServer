const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const memberSchema = new mongoose.Schema({
    id: {type: Number , required:true , unique:true},
    userEmail: {type: String , required:true , unique:true},
    userPwd: {type: String},
    salt: {type: String},
    userNm: {type: String},
    birthday: {type: String},
    regDate: {type:Date , default:Date.now},
    salt: {type:String}
});

memberSchema.plugin(autoIncrement.plugin , {
    model: 'member',
    field: 'id',
    startAt: 0,
    increment: 1
});

memberSchema.statics.findByUserEmail = function(userEmail){
    return this.findOne({userEmail}).exec();
}

memberSchema.statics.findByUserEmailOrUserNm = function(userEmail){
    return this.findOne({userEmail}).exec();
}
// ex) Book.findByTitle('React Tutorials');

// const Member = connection.model('member' , memberSchema);
module.exports = mongoose.model('member' , memberSchema);