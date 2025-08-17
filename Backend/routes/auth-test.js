import express from "express";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// Example protected route
router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

export default router;