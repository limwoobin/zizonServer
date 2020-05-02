const Category = require('../../models/category');

exports.getCategories = function() {
    return new Promise(function(resolve , reject){
        Category.find((err , categories) => {
            if(err){
                reject(err);
            } 
            resolve(categories);
        });
    });
}