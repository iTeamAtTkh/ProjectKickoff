// backend/db/index.js
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances in dev (hot-reload safe)
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // Optional: logs queries & errors
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;