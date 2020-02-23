const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    totalCount: {type:Number , default: 1},
    todayCount: {type:Number , default: 1},
    reqDate: {type:String , required:true}
})

module.exports = mongoose.model('visitor' , visitorSchema);