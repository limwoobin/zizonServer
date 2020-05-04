const Category = require('../../models/category');

// class CategoryService {
//     constructor(Category){
//         this.Category = Category;
//     }
    
//     getCategories() {
//         console.log('Tlqkf');
//         return new Promise(function(resolve , reject){
//             Category.find((err , categories) => {
//                 if(err){
//                     reject(err);
//                 } 
//                 resolve(categories);
//             });
//         });
//     }
// }

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