'use strict';

var express = require('express');
var router = express.Router();

// router.get('/' , (req , res) => {
//     console.log(req.body.contents);
//     return res.json({
//         success: true
//     });
// });

// router.get('/:id' , (req , res) => {
//     console.log('id:' + req.params.id);
//     return res.json({
//         index: req.params.id
//     });
// });

router.get('/', function (req, res) {
    res.send('asdasd');
});

//module.exports = router;
module.exports = router;