// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../util/api";
import { DetailCard } from "../components/layout/DetailCard";
import { Spin } from "antd";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        if (res && res.EC === 0) setProduct(res.DT);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <DetailCard
        product={product}
        onAddToCart={() => console.log("Add to cart", product)}
        onBack={() => navigate("/products")}
      />
    </div>
  );
};

export default ProductDetail;
