// backend/routes/auth.js
import express from "express";
import { createClient } from "@supabase/supabase-js";
import prisma from "../db/index.js";

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password, fullName, ebtNumber, snapNumber } = req.body;

  // 1. Create user in Supabase
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  const user = data.user;

  try {
    // 2. Create matching UserProfile row in your DB
    await prisma.userProfile.create({
      data: {
        id: user.id,         // Supabase UUID
        email,
        fullName,
        ebtNumber: ebtNumber || null,
        snapNumber: snapNumber || null,
      },
    });

    return res.json({ user });
  } catch (err) {
    console.error("Error creating UserProfile:", err);
    return res.status(500).json({ error: "Failed to create UserProfile" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  return res.json({
    token: data.session.access_token,
    user: data.user,
  });
});

export default router;
