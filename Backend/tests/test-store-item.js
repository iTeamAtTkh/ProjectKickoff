// backend/test/test-store-item.js
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to database...");

  // Test connection
  await prisma.$queryRaw`SELECT 1`;

  console.log("DB connection OK");

  // Create a store
  const store = await prisma.store.create({
    data: {
      name: "Hollywood Market",
      address: "1111 Hollywood Blvd",
      zipcode: "90028"
    }
  });

  // Add an item linked to that store
  const item = await prisma.item.create({
    data: {
      name: "Milk",
      description: "1 gallon, whole milk",
      expirationDate: new Date("2025-08-15"),
      storeId: store.id
    }
  });

  // Fetch store with items to verify relation works
  const storeWithItems = await prisma.store.findUnique({
    where: { id: store.id },
    include: { items: true }
  });

  console.log("Store created:", store);
  console.log("Item added:", item);
  console.log("Store with items:", storeWithItems);
}

main()
  .catch((err) => {
    console.error("Error during DB test:", err);
  })
  .finally(() => prisma.$disconnect());