import Category from '../../models/category';

const CategoryService = {};

CategoryService.getCategories = () => {
    return new Promise(function(resolve , reject){
        Category.find((err , categories) => {
            if(err){
                reject(err);
            } 
            resolve(categories);
        });
    });
}

module.exports = CategoryService;