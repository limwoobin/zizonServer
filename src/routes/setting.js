const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));
app.use(morgan);

console.log('Server js !!!');

module.exports = router;