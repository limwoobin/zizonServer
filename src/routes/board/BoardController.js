const express = require('express');
const router = express.Router();
const Board = require('../../models/board');
const common = require('../../common/common');


router.get('/list' , (req , res) => {
    console.log('board...')
    const result = common.result;
    result.code = 'DR00';
    result.message = common.status.DR00;
    
    Board.find((err , boards) => {
        if(err){
            result.code = 'DR01';
            result.message = common.status.DR01;
            result.data = err;
            return result;
        } 
        result.data = boards;
    })
    return res.json(result);
})

module.exports = router;