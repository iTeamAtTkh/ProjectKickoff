// backend/routes/item.js
import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// Search items by name
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const items = await prisma.item.findMany({
    where: { name: { contains: q, mode: "insensitive" }, available: true },
    include: { store: true }
  });
  res.json(items);
});

export default router;