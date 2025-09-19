const User = require("../models/User");
const Product = require("../models/product");

const toggleFavoriteService = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { id: productId } = req.params;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ EC: 1, EM: "Product not found" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ EC: 1, EM: "User not found" });
    }

    // Toggle favorite
    const index = user.favorites.indexOf(productId);
    if (index === -1) {
      user.favorites.push(productId);
    } else {
      user.favorites.splice(index, 1);
    }

    await user.save();

    return {
      EC: 0,
      EM: "Toggle favorite success",
      DT: user.favorites, 
    };
  } catch (err) {
    console.error(">>> Error toggleFavoriteService:", err);
    return { EC: 1, EM: err.message };
  }
};

module.exports = { toggleFavoriteService };
