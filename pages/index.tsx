"use client";

import { useState } from "react";
import SubscribeForm from "@/component/common/SubscribeForm";
import Hero from "@/component/home/Hero";
import Product from "@/component/home/Product";
import ProductCategory from "@/component/home/ProductCatery";
import { IProduct } from "@/models/Product";
import { ICategoryProps } from "@/types";
import { GetServerSideProps } from "next";
import Modal from "@/component/common/Modal";
import LoginForm from "@/component/common/LoginForm";
import RegisterForm from "@/component/common/RegisterForm";

interface HomeProps {
  products: IProduct[];
  productCategory: ICategoryProps[];
}

export default function Home({ products, productCategory }: HomeProps) {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  

  return (
    <section className="pt-6 bg-gray-100">
      {/* Authentication Buttons */}
      <div className="flex justify-end px-12 space-x-4">
        <button
          onClick={() => setRegisterOpen(true)}
          className="bg-green-400 hover:bg-green-500 cursor-pointer text-white px-4 py-2 rounded"
        >
          Register
        </button>
        <button
          onClick={() => setLoginOpen(true)}
          className="border-gray-300 border hover:text-white hover:bg-green-500 cursor-pointer px-4 py-2 rounded"
        >
          Login
        </button>
      </div>

      {/* Main Homepage */}
      <Hero />
      <Product products={products} />
      <ProductCategory productCategory={productCategory} />
      <article className="bg-gray-50">
        <section className="flex flex-col items-center justify-center text-center bg-green-800 rounded-md lg:py-24 py-12 lg:mx-25 mx-0">
          <h1 className="text-[35px] text-white font-bold mt-8">
            Stay in the Loop
          </h1>
          <p className="text-[16px] max-w-3xl mt-2 text-gray-100">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive deals, and special offers.
          </p>
          <SubscribeForm />
          <p className="text-gray-100 text-[16px] mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </section>
      </article>

      {/* Register Modal */}
      <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
        <RegisterForm closeModal={() => setRegisterOpen(false)} />
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm closeModal={() => setLoginOpen(false)} />
      </Modal>
    </section>
  );
}




// --- Server Side Props ---
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const productRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
    );

    if (!productRes.ok) {
      const errorText = await productRes.text();
      console.error("Products API failed:", errorText);
      return { props: { products: [], productCategory: [] } };
    }

    const products: IProduct[] = await productRes.json();

    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!categoryRes.ok) {
      const errorText = await categoryRes.text();
      console.error("Categories API failed:", errorText);
      return { props: { products, productCategory: [] } };
    }

    const productCategory: ICategoryProps[] = await categoryRes.json();

    return { props: { products, productCategory } };
  } catch (err) {
    console.error("getServerSideProps error:", err);
    return { props: { products: [], productCategory: [] } };
  }
};
