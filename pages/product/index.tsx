"use client";

import React, { useEffect, useState } from "react";
import ProductCategoryCard from "../../component/product/ProductCategoryCard";
import { ICategory } from "@/models/Category";
import { ICategoryProps } from "@/types";

const ProductCategories = () => {
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`/api/categories?filterBy=${filterBy}&sortBy=${sortBy}`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filterBy, sortBy]);

  return (
    <div className="space-y-6">
      {/* 🔧 Filter + Sort Controls */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">Sort By</option>
          <option value="max-price">Max Price</option>
          <option value="min-price">Min Price</option>
          <option value="ratings">Ratings</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>
      </div>

      {/* 🖼 Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <ProductCategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            image={cat.image}
            description={cat.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
