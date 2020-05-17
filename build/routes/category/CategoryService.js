'use strict';

var _category = require('../../models/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategoryService = {};

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