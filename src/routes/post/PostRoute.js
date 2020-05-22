const express = require('express');
const router = express();
const PostService = require('./PostService');
const Post = require('../../models/post');
const common = require('../../common/common');
const util = require('../../util/util');

module.exports = router;