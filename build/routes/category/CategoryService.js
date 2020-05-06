'use strict';

var _category = require('../../models/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default class CategoryService {
//     constructor(Category){
//         this.Category = Category;
//     }


//     getCategories() {
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

var CategoryService = {}; // const Category = require('../../models/category');


CategoryService.getCategories = function () {
    return new Promise(function (resolve, reject) {
        _category2.default.find(function (err, categories) {
            if (err) {
                reject(err);
            }
            resolve(categories);
        });
    });
};

module.exports = CategoryService;