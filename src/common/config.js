module.exports = function(){
    const express = require('express');
    const app = express();
    const session = require('express-session');

    app.use(session({
        secret: 'drogbaSession',
        resave: false,
        saveUninitialized: true
    }));
}