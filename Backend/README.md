# Backend API - ProjectKickoff aka PantryPal

## Table of Contents

1. [Overview](#overview)  
2. [Project Structure](#project-structure)  
3. [Getting Started](#getting-started)  
4. [Environment Variables](#environment-variables)  
5. [Database Setup](#database-setup)  
6. [Seeding the Database](#seeding-the-database)  
7. [Running the Server](#running-the-server)  
8. [API Endpoints](#api-endpoints)  
9. [Authentication](#authentication)  
10. [Contributing](#contributing)  

---

## Overview

Backend is built using **Node.js**, **Express**, and **Prisma** with **PostgreSQL** as the database. It provides a REST API for a marketplace-style application where users can search for items, manage a shopping cart, and checkout. Authentication is handled via **Supabase Auth**.

---

## Project Structure

    ProjectKickoff/
    ├── backend/
    │   ├── data/
    │   │   └── masterInventory.json
    │   ├── db/
    │   │   └── index.js
    │   ├── middleware/
    │   │   └── auth.js
    │   ├── prisma/
    │   │   └── schema.prisma
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── auth-test.js
    │   │   ├── item.js
    │   │   ├── order.js
    │   │   ├── store.js
    │   │   └── user.js
    │   ├── scripts/
    │   │   ├── preprocess.js
    │   │   └── seedStores.js
    │   ├── .env.example
    │   ├── .gitignore
    │   ├── index.js
    │   └── package.json



- `db/index.js` – Prisma client instance.  
- `middleware/auth.js` – JWT verification for protected routes.  
- `routes/` – Express route handlers for users, stores, items, orders, and authentication.  
- `scripts/` – Utility scripts including seeding and preprocessing data.  
- `prisma/schema.prisma` – Database schema.  
- `data/masterInventory.json` – Initial inventory used for seeding.  

## Getting Started

1. Clone the repository:
git clone <repo-url>
cd ProjectKickoff/backend

2. Install dependencies:
npm install

3. Create a local .env file based on .env.example with all required keys.
DIRECT_URL=
DATABASE_PASS=
SUPABASE_ANON_KEY=
SUPABASE_JWT_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

## DB Setup
1. Generate Prisma client:
npx prisma generate

2. Apply migrations:
npx prisma migrate dev --name init

3. Verify database tables:
npx prisma studio

## Seeding the Database
1. Seed stores and items:
npm run seed

- This reads data/masterInventory.json and creates stores and items. It then calculates prices, discounts, and sell-by dates dynamically.

## Running the server
1. Development mode (auto-reload):
npm run dev

- Server runs on http://localhost:3000. CORS is configured to allow frontend at http://localhost:5173.

## API Endpoints

### Authentication
| Method | Path         | Description                     |
|--------|--------------|---------------------------------|
| POST   | /auth/signup | Create user in Supabase & DB    |
| POST   | /auth/login  | Login and receive JWT token     |

### Users
| Method | Path       | Description                |
|--------|------------|----------------------------|
| GET    | /users/me  | Get current user profile   |
| PUT    | /users/me  | Update user info           |

### Stores
| Method | Path      | Description        |
|--------|-----------|------------------|
| GET    | /stores   | List all stores   |

### Items
| Method | Path          | Description                   |
|--------|---------------|-------------------------------|
| GET    | /items/search | Search items by name & discount |

### Orders
| Method | Path                | Description                   |
|--------|--------------------|-------------------------------|
| GET    | /orders            | Get user's current orders     |
| POST   | /orders/add        | Add item to cart              |
| DELETE | /orders/remove/:id | Remove item from cart         |
| POST   | /orders/checkout   | Confirm checkout              |

---

### Authentication Details
- JWT authentication via Supabase  
- Protected routes use `verifyToken` middleware  
- `req.userId` is available after token verification  

---

### Contributing
1. Fork repository
    
2. Create feature branch:
git checkout -b feature/your-feature-name

3. Commit changes and push:
git commit -m "Add feature"
git push origin feature/your-feature-name
