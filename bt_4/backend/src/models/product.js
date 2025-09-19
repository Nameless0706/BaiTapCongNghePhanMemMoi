const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    view: { type: Number, default: 0 }, // lượt xem

    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },

    // --- Sản phẩm tương tự ---
    // Có thể gợi ý dựa trên cùng category, hoặc lưu thủ công:
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],

    // --- Thống kê ---
    buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // danh sách khách mua
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }], // danh sách comment
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
