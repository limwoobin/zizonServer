const express = require('express');
const router = express.Router();
const memberRouter = require('./member/member');

console.log('Router...')
router.use('/member' , memberRouter);

module.exports = router;