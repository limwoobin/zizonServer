const express = require('express');
const app = express();
const cron = require('node-cron');
const session = require('express-session');

app.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));

cron.schedule('0 0 * * *' , (req , res) => {
    req.session.destroy((err) => {
        console.error(err);
    })
})