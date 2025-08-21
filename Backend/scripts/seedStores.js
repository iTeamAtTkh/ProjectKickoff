// backend/scripts/seedStores.js
import prisma from "../db/index.js";
import fs from "fs";
import path from "path";

// --- Path to master inventory JSON ---
const masterInventoryPath = path.resolve("./data/masterInventory.json");
const masterInventory = JSON.parse(fs.readFileSync(masterInventoryPath, "utf-8"));

// --- Define Stores ---
const stores = [
  {
    name: "Moose Market",
    locations: [
      { address: "1111 Downtown Blvd", zip: "10001" },
      { address: "2222 Uptown Ave", zip: "10002" },
      { address: "3333 Westtown St", zip: "10003" },
      { address: "4444 Easttown Rd", zip: "10004" },
    ],
  },
  {
    name: "Ziggy Superstore",
    locations: [
      { address: "5555 Central Blvd", zip: "20001" },
      { address: "6666 North Ave", zip: "20002" },
      { address: "7777 South St", zip: "20003" },
      { address: "8888 West Rd", zip: "20004" },
    ],
  },
];

// --- Helpers ---
function getWeightedDaysUntilSellBy() {
  const r = Math.random() * 100;
  if (r < 20) return 0;           // same-day sell-by
  if (r < 45) return Math.floor(Math.random() * 3) + 1; // 1-3 days
  if (r < 70) return Math.floor(Math.random() * 4) + 4; // 4-7 days
  if (r < 85) return Math.floor(Math.random() * 15) + 16; // 16-30 days
  return Math.floor(Math.random() * 30) + 31; // 31-60 days
}

function calculateSellByDate(baseDate = new Date()) {
  const days = getWeightedDaysUntilSellBy();
  const sellByDate = new Date(baseDate);
  sellByDate.setDate(sellByDate.getDate() + days);
  return sellByDate;
}

function calculatePriceAndDiscount(basePrice, daysUntilSellBy) {
  if (daysUntilSellBy < 0) {
    return { finalPrice: 0, discount: 1 }; // past sell-by: free
  } else if (daysUntilSellBy <= 3) {
    return { finalPrice: +(basePrice * 0.7).toFixed(2), discount: 0.3 };
  } else if (daysUntilSellBy <= 7) {
    return { finalPrice: +(basePrice * 0.85).toFixed(2), discount: 0.15 };
  } else {
    return { finalPrice: basePrice, discount: 0 };
  }
}

// --- Seed function ---
async function seedStores() {
  try {
    for (const storeGroup of stores) {
      for (const location of storeGroup.locations) {
        const store = await prisma.store.create({
          data: {
            name: storeGroup.name,
            address: location.address,
            zipcode: location.zip,
          },
        });

        // Add items for this store
         for (const masterItem of masterInventory) {
          const sellByDate = masterItem.sellByDate
            ? new Date(masterItem.sellByDate)
            : calculateSellByDate();

          const today = new Date();
          const diffTime = sellByDate - today;
          const daysUntilSellBy = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const { finalPrice, discount } = calculatePriceAndDiscount(
            masterItem.basePrice,
            daysUntilSellBy
          );

          await prisma.item.create({
            data: {
              name: masterItem.name,
              description: masterItem.description || "",
              price: finalPrice,
              quantity: Math.floor(Math.random() * 20) + 1,
              available: true,
              discount,
              sellByDate, 
              storeId: store.id,
            },
          });
        }

        console.log(`Seeded store: ${storeGroup.name} at ${location.address}`);
      }
    }

    console.log("All stores seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seedStores();