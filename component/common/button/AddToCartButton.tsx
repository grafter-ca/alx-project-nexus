"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

interface AddToCartButtonProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  discount?: string;
  hasDiscount?: boolean;
  quantity?: number;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  id,
  name,
  description,
  price,
  image,
  discount = "0",
  hasDiscount = false,
  quantity = 1,
  className,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ hooks must be inside the component
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    const finalPrice = hasDiscount
      ? Number(price) - (Number(price) * Number(discount)) / 100
      : Number(price);

    dispatch(
      addToCart({
        id,
        name,
        description,
        price: finalPrice,
        quantity,
        image,
      })
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <button
          onClick={handleAddToCart}
          className={`bg-green-700 flex items-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ${className}`}
        >
          <ShoppingCart className="mr-2" size={18} />
          Add
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className={`bg-green-700 flex items-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ${className}`}
        >
          shop Now
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
