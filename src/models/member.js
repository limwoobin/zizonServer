const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const memberSchema = new mongoose.Schema({
    id: {type: Number},
    userEmail: {type: String},
    userPwd: {type: String},
    userNm: {type: String},
    birthday: {type: String},
});

memberSchema.plugin(autoIncrement.plugin , {
    model: 'member',
    field: 'id',
    startAt: 0,
    increment: 1
});

module.exports = mongoose.model('member' , memberSchema);