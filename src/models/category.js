const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/mongodb_tutorial');

autoIncrement.initialize(connection);

const categorySchema = new mongoose.Schema({
    id: {type: Number , required:true , unique:true},
    name: {type:String},
    routerName : {type:String},
});

categorySchema.plugin(autoIncrement.plugin , {
    model: 'category',
    field: 'id',
    startAt: 0,
    increment: 1
});

module.exports = mongoose.model('category' , categorySchema);