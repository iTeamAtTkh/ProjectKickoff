import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// List all stores
router.get("/", async (req, res) => {
  const stores = await prisma.store.findMany({ include: { items: true } });
  res.json(stores);
});

export default router;
