import React from "react";

export const DetailCard = ({ product, onAddToCart, onBack }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg"
          alt={product.name}
          className="rounded-xl object-cover w-full max-h-[400px]"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Price: </span>
          {product.price.toLocaleString()}₫
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Views: </span>
          {product.view}
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Category: </span>
          {product.category?.name || "Uncategorized"}
        </p>

        <p className="text-gray-700 mt-4">{product.description}</p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onBack}
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};
