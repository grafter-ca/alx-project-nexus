import React from "react";
import ProductCategoryCard from "@/component/product/ProductCategoryCard";
import { ICategoryProps } from "@/types";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/router";

interface Props {
  productCategory: ICategoryProps[];
}

const ProductCategoryPage: React.FC<Props> = ({ productCategory }) => {
 const route = useRouter()

  return (
    <article className="lg:pt-16 px-4 py-6 lg:px-16 border-t-2 border-t-gray-100 bg-white ">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Shop by Category</h1>
        <p className="text-xl">
          Discover our handpicked selection of premium products that our customers love most.
        </p>
      </header>

      <section className="px-4 py-12 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {productCategory.slice(0,3).map((category) => (
          <ProductCategoryCard key={category.id} {...category} />
        ))}
      </section>
      <section className="flex items-end justify-end" role="button" onClick={()=>route.push('/categories')}>
        <p className="text-base hover:text-green-600" title="See more categories">See more</p>
        <ChevronRight className="text-green-600 hover:animate-pulse"/>
      </section>
    </article>
  );
};
export default ProductCategoryPage;
