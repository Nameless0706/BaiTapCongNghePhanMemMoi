const CommentSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
