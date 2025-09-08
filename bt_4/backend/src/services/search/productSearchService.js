const { esClient } = require("../../config/elastic");
const Product = require("../../models/product");
const INDEX = "products";

async function indexProduct(product) {
  const { _id, ...docWithoutId } = product.toObject(); // loại bỏ _id

  await esClient.index({
    index: INDEX,
    id: product._id.toString(),
    document: docWithoutId,
  });
}

async function searchProducts(query) {
  const result = await esClient.search({
    index: INDEX,
    query: {
      multi_match: {
        query,
        fields: ["name", "description", "category"],
        fuzziness: "AUTO",
      },
    },
  });

  return result.hits.hits.map((hit) => hit._source);
}

module.exports = {
  indexProduct,
  searchProducts,
};
