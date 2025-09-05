const Category = require("../models/category");

const createCategoryService = async (name, description) => {
  try {
    const newCategory = await Category.create({ name, description });
    return { EC: 0, EM: "Create category success", DT: newCategory };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: null };
  }
};

const getAllCategoriesService = async () => {
  try {
    const categories = await Category.find();
    return { EC: 0, EM: "Get all categories success", DT: categories };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: [] };
  }
};

module.exports = {
  createCategoryService,
  getAllCategoriesService,
};
