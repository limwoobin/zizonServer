const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error' , console.error);
db.once('open' , () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');    
});

// require('../models/customer');   굳이 필요한지 확인해야함
mongoose.connect('mongodb://127.0.0.1:27017/mongodb_tutorial');

module.exports = router;