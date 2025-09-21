import React, { useEffect, useState } from "react";
import { getFavorites } from "../util/api";
import { Card } from "../components/layout/card";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await getFavorites();
        if (res && res.EC === 0) setFavorites(res.DT);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Favorites</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((p) => (
            <Card
              key={p._id}
              product={p}
              onClick={() => navigate(`/product/${p._id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No favorite products yet.</p>
      )}
    </div>
  );
};

export default Favorites;
