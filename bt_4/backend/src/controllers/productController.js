const {
  createProductService,
  getProductsByCategoryService,
  getAllProductsService,
  getProductByIdService,
  searchProductService,
  getRelatedProductsService,
} = require("../services/productService");

const Category = require("../models/category");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, view, categoryName } = req.body;

    // Find category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({
        EC: 1,
        EM: "Category not found",
        DT: null,
      });
    }

    // Use its _id when creating the product
    const data = await createProductService(
      name,
      price,
      description,
      view,
      category._id
    );

    if (data && data.DT) {
      console.log("Created product:", data.DT);
      return res.status(201).json(data);
    } else {
      console.error("Error creating product:", data.EM);
      return res.status(500).json(data);
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Internal server error",
      DT: null,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const data = await getProductsByCategoryService(req, res);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Internal server error",
      DT: null,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await getAllProductsService(req, res);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Internal server error",
      DT: null,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await getProductByIdService(req, res);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Internal server error",
      DT: null,
    });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const data = await getRelatedProductsService(req, res);
    //console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Internal server error",
      DT: null,
    });
  }
};

// Search products
const searchProductController = async (req, res) => {
  const result = await searchProductService(req, res);
  return res.json(result);
};

module.exports = {
  createProduct,
  getProductsByCategory,
  getAllProducts,
  getProductById,
  searchProductController,
  getRelatedProducts,
};
