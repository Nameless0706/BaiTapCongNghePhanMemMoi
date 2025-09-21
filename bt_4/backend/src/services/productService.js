const Product = require("../models/product");
const Category = require("../models/category");

const {
  indexProduct,
  searchProducts,
} = require("./search/productSearchService.js");

const getProductsByCategoryService = async (req, res) => {
  try {
    const { categoryName } = req.params; // /api/products/category/:categoryName
    console.log("Fetching products for category:", categoryName);

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return {
        EC: 1,
        EM: "Category not found",
        DT: null,
      };
    }

    const categoryId = category._id;
    console.log("Found category ID:", categoryId);

    console.log(req.query);

    // Pagination
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    console.log("page:", page);
    console.log("Limit: ", limit);

    const products = await Product.find({ category: categoryId })
      .populate("category")
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Product.countDocuments({ category: categoryId });

    return {
      EC: 0,
      DT: products,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    return {
      EC: 1,
      EM: "Error fetching products",
      error,
    };
  }
};

const createProductService = async (
  name,
  price,
  description,
  view,
  category
) => {
  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      view,
      category,
    });

    await indexProduct(newProduct);

    return { EC: 0, EM: "Create product success", DT: newProduct };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: null };
  }
};

const getAllProductsService = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("category")
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Product.countDocuments();

    return {
      EC: 0,
      EM: "Get all products success",
      DT: products,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: [] };
  }
};

const getProductByIdService = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    let isFavorite = false;

    console.log(req.user);
    if (req.user) {
      isFavorite = req.user.favorites.some(
        (fav) => fav.toString() === product._id.toString()
      );
    }
    return {
      EC: 0,
      EM: "Get product success",
      DT: { ...product.toObject(), isFavorite },
    };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: [] };
  }
};

const getRelatedProductsService = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("category");
    if (!product) return { EC: 1, EM: "Product not found" };

    const related = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id }, // loại trừ chính nó
    }).limit(5);

    return { EC: 0, EM: "Get related products success", DT: related };
  } catch (err) {
    return { EC: 1, EM: err.message };
  }
};

// const searchProductService = async (q) => {
//   try {
//     console.log(q);
//     const results = await searchProducts(q);
//     return{ EC: 0, EM: "Search success", DT: results };
//   } catch (err) {
//     return { EC: 1, EM: err.message };
//   }
// }

const searchProductService = async (req, res) => {
  try {
    const {
      q = "",
      page = 1,
      limit = 10,
      priceMin,
      priceMax,
      viewMin,
      viewMax,
    } = req.query;

    let results = await searchProducts(q); // fuzzy search trên ES

    // filter JS
    if (priceMin) results = results.filter((p) => p.price >= Number(priceMin));
    if (priceMax) results = results.filter((p) => p.price <= Number(priceMax));
    if (viewMin) results = results.filter((p) => p.view >= Number(viewMin));
    if (viewMax) results = results.filter((p) => p.view <= Number(viewMax));

    const start = (page - 1) * limit;
    const end = start + Number(limit);
    const pagedResults = results.slice(start, end);

    return {
      EC: 0,
      EM: "Search success",
      DT: pagedResults,
      total: results.length,
      currentPage: Number(page),
      totalPages: Math.ceil(results.length / limit),
    };
  } catch (err) {
    return { EC: 1, EM: err.message, DT: [] };
  }
};

module.exports = {
  createProductService,
  getProductsByCategoryService,
  getAllProductsService,
  getProductByIdService,
  searchProductService,
  getRelatedProductsService,
};
