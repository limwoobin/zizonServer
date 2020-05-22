import Category from '../../models/category';

const CategoryService = {};

CategoryService.getCategories = () => {
    return Category.find();
}

module.exports = CategoryService;