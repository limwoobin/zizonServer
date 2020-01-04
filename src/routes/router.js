const express = require('express');
const router = express.Router();
const memberRouter = require('./member/member');
const customerRouter = require('./customer/customer');

console.log('Router...')
router.use('/member' , memberRouter);
router.use('/customer' , customerRouter);

module.exports = router