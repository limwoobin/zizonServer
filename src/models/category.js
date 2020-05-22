const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
const connection = mongoose.createConnection(config.dbInfo);

autoIncrement.initialize(connection);

const categorySchema = new mongoose.Schema({
    id         : {type: Number , required: true , unique: true},
    name       : {type: String , required: true},
    type       : {type: String , required: true},
    routerName : {type: String},
});

categorySchema.plugin(autoIncrement.plugin , {
    model       : 'category',
    field       : 'id',
    startAt     : 0,
    increment   : 1
});

module.exports = mongoose.model('category' , categorySchema);