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
      { address: "4444 Easttown Rd", zip: "10004" }
    ]
  },
  {
    name: "Ziggy Superstore",
    locations: [
      { address: "5555 Central Blvd", zip: "20001" },
      { address: "6666 North Ave", zip: "20002" },
      { address: "7777 South St", zip: "20003" },
      { address: "8888 West Rd", zip: "20004" }
    ]
  }
];

// --- Helpers ---
function getWeightedExpirationDays() {
  const r = Math.random() * 100;
  if (r < 20) return -Math.floor(Math.random() * 1); 
  if (r < 45) return Math.floor(Math.random() * 3) + 1; 
  if (r < 70) return Math.floor(Math.random() * 4) + 4; 
  if (r < 85) return Math.floor(Math.random() * 15) + 16; 
  return Math.floor(Math.random() * 15) + 31; 
}

function calculatePrice(basePrice, daysLeft) {
  if (daysLeft <= 0) return 0;
  if (daysLeft >= 1 && daysLeft <= 3) return +(basePrice * 0.7).toFixed(2);
  if (daysLeft >= 4 && daysLeft <= 7) return +(basePrice * 0.85).toFixed(2);
  return basePrice;
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
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + daysLeft);

          await prisma.item.create({
            data: {
              name: item.name,
              description: item.description || "",
              expirationDate,
              available: true,
              storeId: dbStore.id,
              price: calculatePrice(item.basePrice, daysLeft),
              quantity: Math.floor(Math.random() * 20) + 1, // random stock count
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