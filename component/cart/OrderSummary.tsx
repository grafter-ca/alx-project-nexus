"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface IUserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const OrderSummary: React.FC<Props> = ({ subtotal, shipping, tax, total }) => {
  const router = useRouter();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [profile, setProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isLoggedIn) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  const handleCheckout = async () => {
    if (!isLoggedIn || !user || !profile) {
      alert("Please log in before checking out.");
      router.push("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No auth token found, please log in again.");
        router.push("/login");
        return;
      }

      // ✅ Debug cart items before sending
      console.log("🛒 Cart items at checkout:", cartItems);

      const items = cartItems.map((item) => {
        const productId = item._id || item.id; // fallback if _id missing
        if (!productId) {
          console.error("❌ Missing product ID for cart item:", item);
        }
        return {
          product: productId,
          quantity: item.quantity,
          price: item.price,
        };
      });

      console.log("📦 Items sent to order API:", items);

      // ✅ Step 1: Create order in backend
      const orderRes = await fetch("/api/user/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          subtotal,
          shipping,
          tax,
          total,
          paymentMethod: "Chapa", // default or user-selected
        }),
      });

      if (!orderRes.ok) {
        const errText = await orderRes.text();
        console.error("❌ Order API error response:", errText);
        throw new Error("Failed to create order.");
      }

      const orderData = await orderRes.json();
      console.log("✅ Order created successfully:", orderData);

      // ✅ Step 2: Initiate payment
      const paymentRes = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          orderId: orderData._id, // pass order ID for tracking
        }),
      });

      const paymentData = await paymentRes.json();
      console.log("💳 Payment initiation response:", paymentData);

      if (paymentData?.checkoutUrl) {
        window.location.href = paymentData.checkoutUrl;
      } else {
        alert("Failed to initialize payment.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="bg-gray-200 p-12 shadow rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>

      <div className="flex justify-between mb-10">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <hr className="text-gray-300 mb-10" />

      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="flex flex-col space-y-2">
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </button>

        <Link
          href="/catalog"
          className="block text-center mt-2 py-3 border border-gray-300 rounded hover:bg-green-800 hover:text-white transition duration-700 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
