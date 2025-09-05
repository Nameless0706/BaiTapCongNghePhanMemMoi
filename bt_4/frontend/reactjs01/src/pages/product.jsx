import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import useLazyLoad from "../util/useLazyLoad";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllCategories, getAllProductsByCategoryName } from "../util/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/layout/card";
import { LoadingProducts } from "../components/layout/loadingProduct";

const CategoryProducts = () => {
  const { categoryName } = useParams(); // read category from URL
  const navigate = useNavigate();

  const triggerRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // your own products state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      console.log(">>> Res categories: ", res);
      if (res && res.EC === 0) setCategories(res.DT || []);
    } catch (err) {
      console.error("Error loading categories", err);
    }
  };

  // Fetch products by category
  const fetchProducts = async (pageNumber) => {
    try {
      const res = await getAllProductsByCategoryName(categoryName, pageNumber);
      console.log(categoryName, pageNumber, res);

      if (res.DT.length > 0) {
        return res.DT; 
      } else {
        setHasMore(false);
        return []; // return empty array so hook doesn’t break
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  // ✅ renamed destructuring to avoid shadowing
  const { data: lazyProducts, loading } = useLazyLoad({
    triggerRef,
    onGrabData: fetchProducts,
  });

  // When category changes, reset state and reload
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle dropdown change
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/product/category/${selected}`);
    }
  };

  return (
    <div>
      {/* Dropdown for category selection */}
      <div className="mb-4">
        <select
          value={categoryName || ""}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid with lazy loaded products */}
      <div className="grid grid-cols-3 gap-4 content-start">
        {lazyProducts.map((prod) => (
          <Card key={prod._id} owner={prod.price} imageUrl={prod.imageUrl} />
        ))}
      </div>

      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingProducts />
      </div>

      {/* Infinite Scroll for products */}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}>No more products</p>}
      >
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-3 rounded shadow">
              <h3>{p.name}</h3>
              <p>Price: {p.price}</p>
              <p>Category: {p.category?.name}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CategoryProducts;
