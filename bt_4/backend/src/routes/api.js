const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");

const {
  createCategory,
  getAllCategories,
} = require("../controllers/categoryController");

const {
  createProduct,
  getProductsByCategory,
  getAllProducts,
  searchProductController,
  getProductById,
  getRelatedProducts,
} = require("../controllers/productController");

const auth = require("../middlewares/auth.js");
const delay = require("../middlewares/delay");
const { toggleFavorite } = require("../controllers/favoriteController.js");

const router = express.Router();
router.all(/(.*)/, auth);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from API",
  });
});

// Auth
router.post("/register", createUser);
router.post("/login", handleLogin);

// User
router.get("/user", getUser);
router.get("/account", delay, getAccount);

// Category
router.post("/category/add", createCategory);
router.get("/category/all", getAllCategories);

// Product
router.post("/product/add", createProduct);
router.get("/product/category/:categoryName", getProductsByCategory);
router.get("/product/all", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/product/search", searchProductController);
router.get("/product/:id/related", getRelatedProducts);

// Favorite
router.post("/product/:id/favorite", toggleFavorite);

module.exports = router;
