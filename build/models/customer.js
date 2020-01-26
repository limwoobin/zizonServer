'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

var customerSchema = new mongoose.Schema({
    id: { type: Number },
    image: { type: String },
    name: { type: String },
    birthday: { type: String },
    gender: { type: String },
    job: { type: String }
});

customerSchema.plugin(autoIncrement.plugin, {
    model: 'customer',
    field: 'id',
    startAt: 4,
    increment: 1
});

// const Customer = connection.model('customer' , customerSchema);
module.exports = mongoose.model('customer', customerSchema);