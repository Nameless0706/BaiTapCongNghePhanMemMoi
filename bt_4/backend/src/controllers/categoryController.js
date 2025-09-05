const {
  createCategoryService,
  getAllCategoriesService,
} = require("../services/categoryService");

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const data = await createCategoryService(name, description);
  return res.status(200).json(data);
};

const getAllCategories = async (req, res) => {
  const data = await getAllCategoriesService();
  return res.status(200).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};
