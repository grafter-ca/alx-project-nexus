import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // 1. Find category
      const category = await Category.findOne({id}).lean();
      if (!category) return res.status(404).json({ message: "Category not found" });

      // 2. Find products in this category
      const products = await Product.find({ categoryId: id }).lean();

      return res.status(200).json({
        ...category,
        products,
      });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error });
  }
}
