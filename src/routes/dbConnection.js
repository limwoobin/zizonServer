const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error' , console.error);
db.once('open' , () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');    
});

//mongoose.connect('mongodb://127.0.0.1:27017/mongodb_tutorial');

module.exports = router;