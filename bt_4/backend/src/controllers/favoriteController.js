const { toggleFavoriteService } = require("../services/favoriteService");

const toggleFavorite = async (req, res) => {
  try {
    const data = await toggleFavoriteService(req, res);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      EM: "Internal server error",
      DT: null,
    });
  }
};

module.exports = {toggleFavorite}
