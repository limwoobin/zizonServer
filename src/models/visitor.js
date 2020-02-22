const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    name: {type:String , require:true},
    totalCount: {type:Number , required: true},
    todayCount: {type:Number},
    date: {type:String}
})

module.exports = mongoose.model('visitor' , visitorSchema);