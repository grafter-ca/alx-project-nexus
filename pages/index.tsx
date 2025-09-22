import Hero from "@/component/home/Hero";
import Product from "@/component/home/Product";
import ProductCategory from "@/component/home/ProductCatery";
import { IProduct } from "@/models/Product";
import { ICategoryProps } from "@/types";
import { GetServerSideProps } from "next";

interface HomeProps {
  products: IProduct[];
  productCategory:ICategoryProps[];
}

export default function Home({ products,productCategory }: HomeProps) {
  return (
    <div className="py-6 bg-gray-100">
      <Hero />
      <Product products={products} />
      <ProductCategory productCategory={productCategory} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const productRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const products: IProduct[] = await productRes.json();

  const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  const productCategory : ICategoryProps[] = await categoryRes.json();

  return {
    props: { products, productCategory },
  };
};


