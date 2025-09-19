const RecentlyViewedSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        viewedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("recentlyViewed", RecentlyViewedSchema);
