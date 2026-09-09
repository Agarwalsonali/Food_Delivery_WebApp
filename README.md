# 🍔 Food Delivery Web App

<div align="center">

A full-stack food delivery application built with modern web technologies. Customers can discover restaurants, browse menus, place orders, and track deliveries. Restaurants can manage their food items, while delivery partners can accept and manage orders through a streamlined dashboard.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Mongoose](https://img.shields.io/badge/Mongoose-9.0.2-orange?style=for-the-badge&logo=mongoose)](https://mongoosejs.com/)

[Features](#-features) • [Getting Started](#-getting-started) • [API Routes](#-api-routes) • [Workflow](#-workflow) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 👤 Customer
- 🔍 **Restaurant Discovery** - Search restaurants by location or name
- 📋 **Menu Browsing** - View detailed menus with food descriptions and prices
- 🛒 **Shopping Cart** - Add items to cart and review before checkout
- 📦 **Order Placement** - Place orders with automatic tax and delivery charge calculation
- 👤 **User Profile** - View order history with real-time status tracking
- 📍 **Location-based** - Browse restaurants available in your city

### 🏪 Restaurant
- 📝 **Restaurant Registration** - Sign up and manage restaurant profile
- 🍕 **Food Management** - Add, edit, and delete food items
- 🖼️ **Food Details** - Add images, descriptions, and prices
- 📊 **Dashboard** - Centralized management interface
- 🔄 **Real-time Updates** - Changes reflect immediately across the platform

### 🚚 Delivery Partner
- 📝 **Partner Registration** - Sign up with email, mobile, and location
- 📍 **City-based Orders** - View available orders in your city
- ✅ **Order Acceptance** - Accept orders with one click
- 📊 **Order Management** - Track and update delivery status
- 🔄 **Status Updates** - Progress through delivery stages
- 👋 **Secure Logout** - Clean session management

### 🔧 Technical
- 🗄️ **MongoDB Integration** - Persistent data storage with Mongoose ODM
- 🎨 **Responsive Design** - Mobile-friendly interface
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 🔐 **Authentication** - Role-based access control
- 📱 **Modern UI** - Clean, intuitive user experience

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18 or newer
- **npm** (comes with Node.js)
- **MongoDB Atlas** account or compatible MongoDB deployment

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Agarwalsonali/Food_Delivery_WebApp.git
   cd food_webapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   ```

   > ⚠️ **Important**: Never commit `.env.local` or database credentials to version control.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |

---

## 🌐 Main Pages

| Path | Purpose |
|------|---------|
| `/` | Restaurant search and location browsing |
| `/user-auth` | Customer authentication (login/signup) |
| `/explore/[name]` | Restaurant menu and food details |
| `/cart` | Shopping cart review |
| `/order` | Order placement and checkout |
| `/myprofile` | Customer profile and order history |
| `/restaurant` | Restaurant authentication |
| `/restaurant/dashboard/[id]` | Restaurant food management |
| `/deliverypartner` | Delivery partner authentication |
| `/deliverydashboard` | Delivery order management |

---

## 🔌 API Routes

### Customer APIs
- `GET /api/customer` - List and search restaurants
- `GET /api/customer/locations` - Get available restaurant locations
- `GET /api/customer/[id]` - Retrieve restaurant and menu details

### User APIs
- `POST /api/user` - Customer registration
- `POST /api/user/login` - Customer login

### Restaurant APIs
- `POST /api/restaurant` - Restaurant registration/login
- `POST /api/restaurant/foods` - Create food item
- `GET /api/restaurant/foods` - List food items
- `GET /api/restaurant/foods/[id]` - Retrieve food item
- `DELETE /api/restaurant/foods/[id]` - Delete food item
- `GET /api/restaurant/foods/edit/[id]` - Retrieve food item for editing
- `PUT /api/restaurant/foods/edit/[id]` - Update food item

### Order APIs
- `POST /api/order` - Create customer order
- `GET /api/order` - Retrieve customer orders

### Delivery Partner APIs
- `POST /api/deliverypartners/signup` - Delivery partner registration
- `POST /api/deliverypartners/login` - Delivery partner login
- `GET /api/deliverypartners/[city]` - Find delivery partners by city
- `GET /api/deliverypartners/orders/[id]` - Retrieve delivery partner orders
- `PUT /api/deliverypartners/orders/[id]` - Update order status
- `GET /api/deliverypartners/orders/available/[city]` - Get available orders by city
- `PUT /api/deliverypartners/orders/accept` - Accept an order

---

## 🔄 Workflow

### Order Lifecycle

```
Customer Places Order
        ↓
    Status: confirm
        ↓
Restaurant Prepares Order
        ↓
Status: ready_for_pickup
        ↓
Delivery Partner Accepts Order
        ↓
Status: picked_up
        ↓
Status: out_for_delivery
        ↓
Status: delivered
```

### Status Transitions

| From | To |
|------|-----|
| confirm | ready_for_pickup, cancelled |
| ready_for_pickup | picked_up, cancelled |
| picked_up | out_for_delivery, cancelled |
| out_for_delivery | delivered, cancelled |
| delivered | - |
| cancelled | - |

---

## 📁 Project Structure

```
src/app/
├── api/                          # API route handlers
│   ├── customer/                 # Customer-related endpoints
│   ├── deliverypartners/          # Delivery partner endpoints
│   ├── order/                    # Order management
│   ├── restaurant/               # Restaurant endpoints
│   └── user/                     # User authentication
├── _components/                  # Shared React components
│   ├── AddFoodItem.js
│   ├── CustomerHeader.js
│   ├── FoodItemList.js
│   ├── Footer.js
│   ├── Header.js
│   ├── Login.js
│   ├── Signup.js
│   ├── UserLogin.js
│   └── UserSignUp.js
├── lib/                          # Database & models
│   ├── constant.js               # App constants (tax, delivery charges)
│   ├── db.js                     # MongoDB connection
│   ├── deliverypartnersModel.js  # Delivery partner schema
│   ├── foodsModel.js             # Food item schema
│   ├── ordersModel.js            # Order schema
│   ├── restaurantsModel.js       # Restaurant schema
│   └── userModel.js              # User schema
├── cart/                         # Shopping cart page
├── deliverydashboard/            # Delivery partner dashboard
├── deliverypartner/              # Delivery partner auth
├── explore/                      # Restaurant menu browsing
├── myprofile/                    # Customer profile
├── order/                        # Order placement
├── restaurant/                   # Restaurant pages
├── user-auth/                    # Customer auth
├── DeliveryHeader.js             # Delivery partner header
├── globals.css                   # Global styles
├── layout.js                     # Root layout
└── page.js                       # Homepage
```

---

## ⚙️ Configuration

### Database Connection
- **Location**: `src/app/lib/db.js`
- **Database**: `resto_db` on MongoDB Atlas
- **Environment Variables**: `MONGODB_USERNAME`, `MONGODB_PASSWORD`

### App Constants
- **Location**: `src/app/lib/constant.js`
- **Settings**: Tax rate (10%), Delivery charges (100)

### Authentication
- **Method**: localStorage-based session storage
- **Roles**: Customer, Restaurant, Delivery Partner
- **Session Keys**: `user`, `restaurant`, `delivery`

---

## 🏗️ Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

> **Note**: Ensure MongoDB environment variables are configured in your deployment environment before starting the production server.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| Mongoose | 9.0.2 | MongoDB ODM |
| MongoDB | Atlas | NoSQL database |
| JavaScript | ES6+ | Programming language |
| CSS | Modules + Global | Styling |

---

## 📝 Database Schema

### User (Customer)
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  city: String,
  address: String,
  mobile: String
}
```

### Restaurant
```javascript
{
  name: String,
  email: String,
  password: String,
  city: String,
  address: String,
  contact: Number
}
```

### Food Item
```javascript
{
  name: String,
  price: Number,
  img_path: String,
  description: String,
  resto_id: ObjectId
}
```

### Order
```javascript
{
  user_id: ObjectId,
  customer_name: String,
  customer_address: String,
  customer_mobile: String,
  foodItemIds: [ObjectId],
  resto_id: ObjectId,
  deliveryBoy_id: ObjectId,
  status: String,
  amount: String
}
```

### Delivery Partner
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  city: String,
  address: String,
  mobile: String (unique)
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---


