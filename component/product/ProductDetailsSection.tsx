// components/home/ProductDetailsSection.tsx
import React from "react";

async function getProductDetails() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product-details`, {
    cache: "no-store", // disable cache for fresh data (or use revalidate)
  });

  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}

export default async function ProductDetailsSection() {
  const productDetails = await getProductDetails();

  return (
    <section className="px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Product Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productDetails.map((detail: any) => (
          <div key={detail._id} className="p-4 border rounded-xl shadow">
            <h3 className="font-semibold">{detail.name}</h3>
            <p className="text-gray-600">{detail.description}</p>
            <p className="text-sm text-gray-500">Stock: {detail.stock}</p>
            <div className="flex gap-2 mt-2">
              {detail.gallery.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={detail.name} className="w-12 h-12 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
