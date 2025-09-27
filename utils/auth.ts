import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // usually contains { id, email, role, ... }
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
