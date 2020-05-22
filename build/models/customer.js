'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('../config/config');
var connection = mongoose.createConnection(config.dbInfo);

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

module.exports = mongoose.model('customer', customerSchema);