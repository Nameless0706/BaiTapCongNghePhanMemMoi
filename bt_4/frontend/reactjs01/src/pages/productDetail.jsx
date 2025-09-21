// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts, toggleFavorites } from "../util/api";
import { DetailCard } from "../components/layout/DetailCard";
import { Spin } from "antd";
import { Card } from "./../components/layout/card";
import { Heart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        if (res && res.EC === 0) {
          setProduct(res.DT);

          // check if user has this product in favorites
          setIsFavorite(res.DT.isFavorite ?? false);

          const relatedRes = await getRelatedProducts(res.DT._id);
          if (relatedRes && relatedRes.EC === 0) {
            setRelated(relatedRes.DT);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleToggleFavorite = async () => {
    try {
      const res = await toggleFavorites(product._id);
      if (res && res.EC === 0) {
        setIsFavorite(!isFavorite);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Detail card with heart */}
      <div className="relative">
        <DetailCard
          product={product}
          onAddToCart={() => console.log("Add to cart", product)}
          onBack={() => navigate("/products")}
        />

        {/* Heart button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
        >
          <Heart
            size={28}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>
      </div>

      {/* Related products */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        {related.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Card
                key={p._id}
                product={p}
                onClick={() => navigate(`/product/${p._id}`)}
              />
            ))}
          </div>
        ) : (
          <p>No related products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
