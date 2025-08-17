import express from "express";
import verifyToken from "../middleware/auth.js";
import prisma from "./db/index.js"; // Prisma client

const router = express.Router();

// Get current user's profile (used by /dashboard)
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await prisma.userProfile.findUnique({
      where: { id: req.userId },
      include: { orders: { include: { orderItems: { include: { item: true } } } } }
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Update user info
router.put("/me", verifyToken, async (req, res) => {
  const { fullName, email } = req.body;
  try {
    const updatedUser = await prisma.userProfile.update({
      where: { id: req.userId },
      data: { fullName, email }
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

export default router;
