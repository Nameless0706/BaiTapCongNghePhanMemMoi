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
} = require("../controllers/productController");

const auth = require("../middlewares/auth.js");
const delay = require("../middlewares/delay");

const router = express.Router();
router.all(/(.*)/, auth);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from API",
  });
});

router.post("/register", createUser);
router.post("/login", handleLogin);

router.get("/user", getUser);
router.get("/account", delay, getAccount);

router.post("/category/add", createCategory);
router.get("/category/all", getAllCategories);

router.post("/product/add", createProduct);
router.get("/product/category/:categoryName", getProductsByCategory);
router.get("/product/all", getAllProducts);

module.exports = router;
