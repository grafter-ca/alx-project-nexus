import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Category from "@/models/Category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const { filterBy, sortBy } = req.query;

      let query = Category.find();

      // Optional filtering by name
      if (filterBy && typeof filterBy === "string" && filterBy.trim() !== "") {
        query = query.where("name").regex(new RegExp(filterBy, "i"));
      }

      // Optional sorting
      if (sortBy && typeof sortBy === "string") {
        switch (sortBy) {
          case "name-asc":
            query = query.sort({ name: 1 });
            break;
          case "name-desc":
            query = query.sort({ name: -1 });
            break;
          case "createdAt":
            query = query.sort({ createdAt: -1 });
            break;
        }
      }

      const categories = await query.lean();

      return res.status(200).json(
        categories.map((cat) => ({
          id: cat._id.toString(),
          name: cat.name,
          description: cat.description,
          image: cat.image,
        }))
      );
    }

    if (req.method === "POST") {
      const { name, image, description } = req.body;
      if (!name || !image) {
        return res.status(400).json({ message: "Name and image are required" });
      }
      const newCategory = await Category.create({ name, image, description });
      return res.status(201).json(newCategory);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Category API error:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}
