const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'drogbaSession',
    resave: false,
    saveUninitialized: true
}));
app.use(morgan);
app.use(cors());

console.log('Server js !!!');

module.exports = router;