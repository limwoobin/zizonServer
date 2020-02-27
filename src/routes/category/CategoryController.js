const express = require('express');
const router = express.Router();
const Category = require('../../models/category');
const common = require('../../common/common');

router.get('/list' , (req , res) => {
    Category.find((err , categories) => {
        if(err){
            common.result.code = 'DR01';
            common.result.message = common.status.DR00;
            return res.json(common.result);
        } 
        
        common.result.code = 'DR00';
        common.result.message = common.status.DR00;
        common.result.data = categories;
        return res.json(common.result);
    })
});

module.exports = router;