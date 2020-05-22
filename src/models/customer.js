const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.dbInfo);

autoIncrement.initialize(connection);

const customerSchema = new mongoose.Schema({
    id          : {type: Number},
    image       : {type: String},
    name        : {type: String},
    birthday    : {type: String},
    gender      : {type: String},
    job         : {type: String}
});

customerSchema.plugin(autoIncrement.plugin , {
    model       : 'customer',
    field       : 'id',
    startAt     : 4,
    increment   : 1
});

module.exports = mongoose.model('customer' , customerSchema);