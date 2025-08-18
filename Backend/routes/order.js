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

// Add item to current cart (order)
router.post("/add", verifyToken, async (req, res) => {
  const { itemId } = req.body;

  // Check for existing unconfirmed order
  let order = await prisma.order.findFirst({ where: { userId: req.userId, confirmed: false } });

  if (!order) {
    order = await prisma.order.create({ data: { userId: req.userId } });
  }

  const orderItem = await prisma.orderItem.create({
    data: { orderId: order.id, itemId }
  });

  res.json({ order, orderItem });
});

// Remove item from cart
router.delete("/remove/:itemId", verifyToken, async (req, res) => {
  const { itemId } = req.params;
  const order = await prisma.order.findFirst({ where: { userId: req.userId, confirmed: false } });
  if (!order) return res.status(404).json({ error: "No active cart found" });

  await prisma.orderItem.deleteMany({ where: { orderId: order.id, itemId: Number(itemId) } });
  res.json({ message: "Item removed" });
});

// Checkout order
router.post("/checkout", verifyToken, async (req, res) => {
  const { pickupDate, storeId } = req.body;
  const order = await prisma.order.findFirst({ where: { userId: req.userId, confirmed: false }, include: { orderItems: { include: { item: true } } } });
  if (!order) return res.status(404).json({ error: "No active cart found" });

  await prisma.order.update({ where: { id: order.id }, data: { confirmed: true } });

  res.json({
    message: "Order confirmed",
    pickupDate,
    storeId,
    items: order.orderItems.map(oi => oi.item)
  });
});

export default router;
