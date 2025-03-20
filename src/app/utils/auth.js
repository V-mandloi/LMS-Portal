import jwt from "jsonwebtoken";

export function verifyToken(req) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Returns the decoded payload (e.g., user ID)
  } catch (error) {
    throw new Error("Invalid token");
  }
}
