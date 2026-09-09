# Food Web App

A full-stack food delivery application built with [Next.js](https://nextjs.org/) App Router, React, and MongoDB. Customers can discover restaurants, browse menus, place orders, and view their profiles. Restaurants can manage food items, while delivery partners can register, log in, and manage assigned orders.

## Features

- Browse restaurants by location or restaurant/food name
- View restaurant menus and food details
- Customer sign-up, login, profile, cart, and order history
- Restaurant sign-up and login
- Add, edit, list, and delete restaurant food items
- Delivery-partner sign-up and login
- Delivery-partner dashboard and order status updates
- MongoDB persistence through Mongoose
- Responsive styling with CSS modules and global styles

## Tech stack

- Next.js `16.1.1`
- React `19.2.3`
- Mongoose `9.0.2`
- MongoDB Atlas
- JavaScript

## Prerequisites

- Node.js 18.18 or newer
- npm
- A MongoDB Atlas database, or a compatible MongoDB deployment

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```env
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   ```

   The application uses these values to connect to the `resto_db` database on the configured MongoDB Atlas cluster. Do not commit `.env.local` or database credentials.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server with hot reload |
| `npm run build` | Create a production build                    |
| `npm run start` | Start the production server after building   |

## Main pages

| Path                         | Purpose                                       |
| ---------------------------- | --------------------------------------------- |
| `/`                          | Search for restaurants and browse by location |
| `/user-auth`                 | Customer authentication                       |
| `/explore/[name]`            | View a restaurant and its menu                |
| `/cart`                      | Review selected food items                    |
| `/order`                     | Place an order                                |
| `/myprofile`                 | View customer profile and order history       |
| `/restaurant`                | Restaurant authentication and entry point     |
| `/restaurant/dashboard/[id]` | Manage a restaurant's food items              |
| `/deliverypartner`           | Delivery-partner authentication               |
| `/deliverydashboard`         | View and manage delivery orders               |

## API routes

The backend is implemented with Next.js route handlers under `src/app/api`.

- `/api/customer` — list and search restaurants
- `/api/customer/locations` — list available restaurant locations
- `/api/customer/[id]` — retrieve a restaurant and its menu
- `/api/user` and `/api/user/login` — customer registration and login
- `/api/restaurant` — restaurant registration and login
- `/api/restaurant/foods` — create and list food items
- `/api/restaurant/foods/[id]` — retrieve or delete a food item
- `/api/restaurant/foods/edit/[id]` — retrieve or update a food item
- `/api/order` — create and retrieve customer orders
- `/api/deliverypartners/signup` — delivery-partner registration
- `/api/deliverypartners/login` — delivery-partner login
- `/api/deliverypartners/[city]` — find delivery partners by city
- `/api/deliverypartners/orders/[id]` — retrieve and update delivery orders

## Project structure

```text
src/app/
├── api/                 # MongoDB-backed API route handlers
├── _components/         # Shared React UI components
├── lib/                 # Database connection and Mongoose models
├── explore/             # Restaurant and menu browsing
├── restaurant/          # Restaurant pages and dashboard
├── deliverypartner/     # Delivery-partner pages
├── deliverydashboard/   # Delivery order management
├── cart/                # Shopping cart
├── order/               # Order placement
└── myprofile/           # Customer profile and order history
```

## Configuration notes

- Database connection settings are defined in `src/app/lib/db.js`.
- Tax and delivery charges are defined in `src/app/lib/constant.js`.
- Keep database credentials in environment variables rather than source code.
- Some client-side requests currently use `http://localhost:3000`; use the local development server on port 3000 unless those URLs are updated for deployment.

## Production build

Build and run the production version with:

```bash
npm run build
npm run start
```

Ensure the MongoDB environment variables are configured in the deployment environment before starting the application.
