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
function getWeightedExpirationDays() {
  const r = Math.random() * 100;

  if (r < 20) return 0; // almost expired
  if (r < 45) return Math.floor(Math.random() * 3) + 1; // 1-3 days left
  if (r < 70) return Math.floor(Math.random() * 4) + 4; // 4-7 days left
  if (r < 85) return Math.floor(Math.random() * 15) + 16; // 16-30 days left
  return Math.floor(Math.random() * 15) + 31; // 31-45 days left
}

// --- Calculate discounted price and discount percentage ---
function calculatePriceAndDiscount(basePrice, daysLeft) {
  let finalPrice = basePrice;
  let discount = 0;

  if (daysLeft <= 0) {
    finalPrice = 0;
    discount = 1; // 100% off
  } else if (daysLeft >= 1 && daysLeft <= 3) {
    finalPrice = +(basePrice * 0.7).toFixed(2);
    discount = 0.3;
  } else if (daysLeft >= 4 && daysLeft <= 7) {
    finalPrice = +(basePrice * 0.85).toFixed(2);
    discount = 0.15;
  } else {
    finalPrice = basePrice;
    discount = 0;
  }

  return { finalPrice, discount };
}

// --- Seed DB ---
async function seedStores() {
  try {
    for (const store of stores) {
      for (const loc of store.locations) {
        const dbStore = await prisma.store.create({
          data: {
            name: store.name,
            address: loc.address,
            zipcode: loc.zip,
          },
        });

        // Pick 25 random items
        const shuffled = [...masterInventory].sort(() => 0.5 - Math.random());
        const selectedItems = shuffled.slice(0, 25);

        for (const item of selectedItems) {
          const daysLeft = getWeightedExpirationDays();
          const sellByDate = new Date();
          sellByDate.setDate(sellByDate.getDate() + daysLeft);

          const { finalPrice, discount } = calculatePriceAndDiscount(item.basePrice, daysLeft);

          await prisma.item.create({
            data: {
              name: item.name,
              description: item.description || "",
              sellByDate,
              available: true,
              storeId: dbStore.id,
              price: finalPrice,
              quantity: Math.floor(Math.random() * 20) + 1,
              discount,
            },
          });
        }

        console.log(`Seeded store: ${store.name} at ${loc.address}`);
      }
    }

    console.log("All stores seeded successfully!");
  } catch (err) {
    console.error("Error seeding stores:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seedStores();