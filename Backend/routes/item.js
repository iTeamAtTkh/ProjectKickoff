// backend/routes/item.js
import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// Helper to calculate days until sell-by
function calculateDaysUntilSellBy(sellByDate) {
  const today = new Date();
  const sellBy = new Date(sellByDate);
  const diffTime = sellBy - today; // milliseconds
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days
}

// Search items by name
router.get("/search", async (req, res) => {
  const { q } = req.query;

  try {
    const items = await prisma.item.findMany({
      where: { name: { contains: q, mode: "insensitive" }, available: true },
      include: { store: true },
    });

    // Add daysUntilSellBy and originalPrice
    const itemsWithOriginalPrice = items.map(item => {
      const daysUntilSellBy = calculateDaysUntilSellBy(item.sellByDate);

      const originalPrice = item.discount
        ? +(item.price / (1 - item.discount)).toFixed(2)
        : item.price;

      return {
        ...item,
        daysUntilSellBy,
        originalPrice
      };
    });

    res.json(itemsWithOriginalPrice);
  } catch (err) {
    console.error("Error searching items:", err);
    res.status(500).json({ error: "Failed to search items" });
  }
});

export default router;