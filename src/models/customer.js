const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: {type: Number},
    image: {type: String},
    name: {type: String},
    birthday: {type: String},
    gender: {type: String},
    job: {type: String}
});


module.exports = mongoose.model('customer' , customerSchema);