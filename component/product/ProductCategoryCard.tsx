import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ICategoryProps } from "@/types";

const ProductCategoryCard: React.FC<ICategoryProps> = ({
  id,
  name,
  image,
  description,
}) => {
  return (
    <div className="relative group rounded-[14px] h-64 shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Category Image */}
      <Image
        src={image}
        alt={name}
        width={350}
        height={280}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark Overlay that fades in on hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content - slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-start p-4">
        <h1 className="text-white text-2xl font-bold">{name}</h1>
        {description && (
          <p className="text-gray-200 text-sm mt-1">{description}</p>
        )}

        {/* Action button */}
        <button
          role="button"
          className="mt-3 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
          aria-label={`Explore ${name}`}
        >
          Explore
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCategoryCard;
