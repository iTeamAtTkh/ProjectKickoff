// backend/middleware/auth.js
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
// Load JWT secret from env
const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;

if (!supabaseJwtSecret) {
  throw new Error("Missing SUPABASE_JWT_SECRET in environment variables.");
}

// Middleware to validate access token locally using JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, supabaseJwtSecret, { algorithms: ["HS256"] });

    req.user = decoded;   // entire JWT payload
    req.userId = decoded.sub; // convenience for DB lookups

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default verifyToken;