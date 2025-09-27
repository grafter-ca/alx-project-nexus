"use client";
import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setKeyword,
  filterProducts,
  setAllProducts,
} from "@/redux/slices/searchSlice";
import { ProductCard } from "@/interfaces";
import { useRouter } from "next/navigation"; // ✅ App Router navigation

interface Props {
  allProducts?: ProductCard[]; // optional for Header usage
}

const SearchBar: React.FC<Props> = ({ allProducts }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const keyword = useSelector((state: RootState) => state.search.keyword);

  // Initialize allProducts in Redux if passed
  useEffect(() => {
    if (allProducts) {
      dispatch(setAllProducts(allProducts));
    }
  }, [allProducts, dispatch]);

  // Update filtered products whenever keyword changes
  useEffect(() => {
    dispatch(filterProducts(allProducts));
  }, [keyword, allProducts, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(keyword)}`);
    } else {
      router.push("/catalog"); // go to catalog even if empty
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 rounded-md bg-gray-100 border-2 border-gray-200 w-full lg:w-[350px] p-2 focus-within:border-green-300 lg:ml-8 ml-0"
    >
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search products..."
        className="border-none outline-none w-full bg-transparent"
        value={keyword}
        onChange={handleChange}
        aria-label="Search products"
      />
    </form>
  );
};

export default SearchBar;
