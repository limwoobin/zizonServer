const express = require('express');
const app = express();
const cron = require('node-cron');

cron.schedule('0 0 * * *' , (req , res) => {
    req.session.destroy((err) => {
        console.error(err);
    })
})