import jwt from "jsonwebtoken";

// Server-side token verification
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

// Client-side token decoding
export function decodeToken(token) {
  try {
    const decoded = jwt.decode(token); // Decode the token without verifying
    return decoded; // Returns the decoded payload (e.g., user ID)
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
