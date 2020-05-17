const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/config.json');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error' , console.error);
db.once('open' , () => {
    console.log('Connected to mongod server');    
});

const connectUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbs}`;

mongoose.connect(connectUrl);

module.exports = router;