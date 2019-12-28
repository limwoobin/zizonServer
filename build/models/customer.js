'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    id: { type: Number },
    image: { type: String },
    name: { type: String },
    birthday: { type: String },
    gender: { type: String },
    job: { type: String }
});

module.exports = mongoose.model('Customer', customerSchema);