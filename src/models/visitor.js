const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    todayCount  : {type: Number , default: 0},
    reqDate     : {type: String , required: true , unique: true}
})

module.exports = mongoose.model('visitor' , visitorSchema);