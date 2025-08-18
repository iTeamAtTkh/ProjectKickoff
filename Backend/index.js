import express from "express";
import dotenv from "dotenv";
import authTestRouter from "./routes/auth-test.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount routers
app.use("/auth-test", authTestRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
