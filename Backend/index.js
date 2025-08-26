import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import authTestRouter from "./routes/auth-test.js";
import userRouter from "./routes/user.js";
import storeRouter from "./routes/store.js";
import itemRouter from "./routes/item.js";
import orderRouter from "./routes/order.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("DEBUG ENV:", {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "loaded" : "missing",
  SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET ? "loaded" : "missing",
});

// Enable CORS for frontend
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://your-netlify-site.netlify.app" // production frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Mount routers
app.use("/auth", authRoutes);
app.use("/auth-test", authTestRouter);
app.use("/users", userRouter);
app.use("/stores", storeRouter);
app.use("/items", itemRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
