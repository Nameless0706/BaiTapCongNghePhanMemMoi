import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllProductsByCategoryName,
  getAllProducts,
  searchProducts,
} from "../util/api";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/layout/card";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 6;

  // --- Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res && res.EC === 0) setCategories(res.DT || []);
    } catch (err) {
      console.error("Error loading categories", err);
    }
  };

  // --- Fetch all products
  const fetchAllProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await getAllProducts(pageNum, PAGE_SIZE);
      if (res.DT.length >= 0) {
        setProducts(res.DT);
        setTotalPages(res.totalPages || 1);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Error fetching all products:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch products by category
  const fetchProductsByCategory = async (pageNum = 1) => {
    if (!categoryName) return;
    setLoading(true);
    try {
      const res = await getAllProductsByCategoryName(
        categoryName,
        pageNum,
        PAGE_SIZE
      );
      if (res.DT.length >= 0) {
        setProducts(res.DT);
        setTotalPages(res.totalPages || 1);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Error fetching category products:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch products by search
  const fetchSearchProducts = async (pageNum = 1) => {
    if (!searchTerm) return; // empty -> no search
    setLoading(true);
    try {
      const res = await searchProducts(searchTerm);
      console.log(res);
      if (res.DT.length >= 0) {
        setProducts(res.DT);
        setTotalPages(res.totalPages || 1);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Error searching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Effects
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    if (searchTerm) {
      fetchSearchProducts(1);
    } else if (categoryName) {
      fetchProductsByCategory(1);
    } else {
      fetchAllProducts(1);
    }
  }, [categoryName, searchTerm]);

  // --- Handlers
  const handleCategoryChange = (e) => {
    setSearchTerm(""); // reset search if change category
    const selected = e.target.value;
    if (selected) navigate(`/product/category/${selected}`);
    else navigate(`/products`);
  };

  const handlePrev = () => {
    if (page > 1) {
      searchTerm
        ? fetchSearchProducts(page - 1)
        : categoryName
        ? fetchProductsByCategory(page - 1)
        : fetchAllProducts(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      searchTerm
        ? fetchSearchProducts(page + 1)
        : categoryName
        ? fetchProductsByCategory(page + 1)
        : fetchAllProducts(page + 1);
    }
  };

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="mb-4 flex gap-4">
        <select
          value={categoryName || ""}
          onChange={handleCategoryChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- All Products --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-center py-6">Loading...</p>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-6">No products found.</p>
      )}
    </div>
  );
};

export default CategoryProducts;
