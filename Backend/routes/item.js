// backend/routes/item.js
import express from "express";
import prisma from "../db/index.js";

const router = express.Router();

// -------------------------
// HELPER FUNCTIONS
// -------------------------

// Helper to calculate days until sell-by
function calculateDaysUntilSellBy(sellByDate) {
  if (!sellByDate) return null; // handle missing sell-by
  const today = new Date();
  const sellBy = new Date(sellByDate);
  const diffTime = sellBy - today; // milliseconds
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days
}

// -------------------------
// SEARCH ITEMS BY NAME
// -------------------------
router.get("/search", async (req, res) => {
  const { q, discount } = req.query; // Grab search query and optional discount filter

  try {
    // Build dynamic "where" clause
    const where = {
      name: { contains: q, mode: "insensitive" }, // search by name (case-insensitive)
      available: true, // only available items
    };

    // Apply discount filter if present
    if (discount !== undefined) {
      const discountNum = Number(discount);
      if (!isNaN(discountNum)) {
        if (discountNum === 100) {
          where.discount = 1; // Free items
        } else {
          where.discount = discountNum / 100; // e.g., 15% -> 0.15
        }
      }
    }

    // Fetch items from DB
    const items = await prisma.item.findMany({
      where,
      include: { store: true }, // Include store info
    });

    // Add extra calculated fields
    const itemsWithOriginalPrice = items.map(item => {
      // Calculate days until sell-by
      const daysUntilSellBy = calculateDaysUntilSellBy(item.sellByDate);

      // Normalize discount
      const discountValue = item.discount ?? 0;

      // Calculate original price before discount
      const originalPrice =
        discountValue > 0
          ? +(item.price / (1 - discountValue)).toFixed(2)
          : item.price;

      return {
        ...item,
        discount: discountValue, // always number
        daysUntilSellBy,         // null if no sell-by
        originalPrice,           // original price before discount
      };
    });

    res.json(itemsWithOriginalPrice);
  } catch (err) {
    console.error("Error searching items:", err);
    res.status(500).json({ error: "Failed to search items" });
  }
});

export default router;
