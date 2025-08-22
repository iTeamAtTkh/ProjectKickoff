// backend/routes/order.js
import express from "express";
import verifyToken from "../middleware/auth.js";
import prisma from "../db/index.js";

const router = express.Router();

// Get user's current orders
router.get("/", verifyToken, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { orderItems: { include: { item: true } } }
  });
  res.json(orders);
});

// -------------------------
// Add item to current cart
// -------------------------
router.post("/add", verifyToken, async (req, res) => {
  try {
    console.log("Incoming request to /orders/add");
    console.log("Decoded JWT payload:", req.user);
    console.log("User ID being used:", req.userId);
    console.log("Item ID from request body:", req.body.itemId);
    
    const { itemId } = req.body;
    const numericItemId = Number(itemId);
    if (!numericItemId) {
      return res.status(400).json({ error: "Invalid itemId" });
    }

    // Find or create unconfirmed order
    let order = await prisma.order.findFirst({ 
      where: { userId: req.userId, confirmed: false } 
    });

    if (!order) {
    order = await prisma.order.create({ data: { userId: req.userId } });
  }

  // Add the new item to the order
  await prisma.orderItem.create({
    data: { orderId: order.id, itemId: numericItemId } // fixed variable name
  });
  
  // Return full updated order with all items
  const updatedOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: { orderItems: { include: { item: true } } }
  });

  res.json(updatedOrder);
  } catch (err) {
    console.error("POST /orders/add error:", err);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// Remove item from cart
router.delete("/remove/:itemId", verifyToken, async (req, res) => {
  const { itemId } = req.params;

  // Find Active cart
  const order = await prisma.order.findFirst({ 
    where: { userId: req.userId, confirmed: false } 
  });
  if (!order) return res.status(404).json({ error: "No active cart found" });

  // Remove the item from the order
  await prisma.orderItem.deleteMany({ 
    where: { orderId: order.id, itemId: Number(itemId) } 
  });
  
  // Return full updated order
  const updatedOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: { orderItems: { include: { item: true } } }
  });

 res.json(updatedOrder);
});

// -------------------------
// Checkout order
// -------------------------
router.post("/checkout", verifyToken, async (req, res) => {
  const { pickupDate, storeId } = req.body;

  // Get current unconfirmed order with items
  const order = await prisma.order.findFirst({
    where: { userId: req.userId, confirmed: false }, 
    include: { orderItems: { include: { item: true } } } 
  });
  if (!order) return res.status(404).json({ error: "No active cart found" });

  // Mark order as confirmed
  await prisma.order.update({ 
    where: { id: order.id }, 
    data: { confirmed: true } 
  });

  // Return confirmation info
  res.json({
    message: "Order confirmed",
    pickupDate,
    storeId,
    items: order.orderItems.map(oi => oi.item)
  });
});

export default router;
