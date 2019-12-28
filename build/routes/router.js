'use strict';

var express = require('express');
var router = express.Router();
var memberRouter = require('./member/member');

console.log('Router...');
router.use('/member', memberRouter);

module.exports = router;