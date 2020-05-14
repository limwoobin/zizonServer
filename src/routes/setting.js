const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./dbConnection');


app.use(db);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan);
app.use(cors());

console.log('Server js !!!');

module.exports = router;