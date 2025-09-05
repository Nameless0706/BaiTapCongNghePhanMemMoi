const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" , required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("product", ProductSchema);
