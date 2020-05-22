const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.dbInfo);
const crypto = require('crypto');


autoIncrement.initialize(connection);

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const memberSchema = new mongoose.Schema({
    id              : {type: Number , required: true , unique: true},
    userEmail       : {type: String , required: true , unique: true},
    userPwd         : {type: String},
    salt            : {type: String},
    userNm          : {type: String},
    birthday        : {type: String},
    profileImage    : imageSchema,
    regDate         : {type: Date , default: Date.now},
    salt            : {type: String}
});

memberSchema.plugin(autoIncrement.plugin , {
    model       : 'member',
    field       : 'id',
    startAt     : 0,
    increment   : 1
});

memberSchema.statics.findByUserEmail = function(userEmail){
    return this.findOne({userEmail}).exec();
}

module.exports = mongoose.model('member' , memberSchema);