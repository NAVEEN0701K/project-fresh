# 🌿 FreshBasket — Farm-Fresh E-Commerce Marketplace

A complete, professional, responsive MERN stack e-commerce catalog for fresh fruits, vegetables and flowers.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite, Tailwind CSS, React Router DOM |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Icons | Lucide React |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
poject fresh/
├── backend/
│   ├── controllers/productController.js
│   ├── models/Product.js
│   ├── routes/productRoutes.js
│   ├── seed.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/   (Header, Footer, Button, Loader, CartDrawer)
    │   │   └── catalog/  (HeroBanner, CategoryList, ProductCard, ProductGrid, ProductFilters, ProductSort, Pagination)
    │   ├── pages/        (Home, Catalog, Fruits, Vegetables, Flowers, ProductDetails, Cart)
    │   ├── context/      (CartContext)
    │   ├── hooks/        (useProducts)
    │   ├── services/     (api, productService)
    │   ├── utils/        (formatPrice)
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js v18+ installed
- MongoDB running locally (default: `mongodb://127.0.0.1:27017`)

### 1. Clone / Enter the project folder
```bash
cd "poject fresh"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Seed the database with sample products:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

The backend will run at: **http://localhost:5000**

### 3. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at: **http://localhost:5173**

> **Note:** Vite proxies `/api` calls to `http://localhost:5000` automatically.

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero banner, categories, featured & newest products |
| `/catalog` | Catalog | All products with search, filter, sort, pagination |
| `/fruits` | Fruits | Fruits-only catalog with filters |
| `/vegetables` | Vegetables | Vegetables-only catalog with filters |
| `/flowers` | Flowers | Flowers-only catalog with filters |
| `/product/:id` | Product Details | Full details + related products |
| `/cart` | Shopping Cart | Cart management + order summary |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | Get products (supports search, filter, sort, pagination) |
| GET | `/api/products/categories` | Get category stats |
| GET | `/api/products/:id` | Get product by ID + related |

### Query Parameters for `/api/products`
| Param | Type | Description |
|---|---|---|
| `search` | string | Full-text search |
| `category` | string | Filter by category (fruits/vegetables/flowers) |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |
| `isAvailable` | boolean | Availability filter |
| `sort` | string | Sort field (price/name/rating/createdAt) |
| `order` | string | asc / desc |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12, max: 50) |
| `featured` | boolean | Featured products only |
| `seasonal` | boolean | Seasonal products only |

---

## 🎨 Color Palette

| Name | Hex |
|---|---|
| Primary Green | `#15803D` |
| Secondary Green | `#DCFCE7` |
| Background | `#F8FAF7` |
| Accent Orange | `#F97316` |
| Text Dark | `#1F2937` |

---

## 📱 Responsive Breakpoints

| Screen | Width | Layout |
|---|---|---|
| Mobile | 375px–767px | 2-col grid, hamburger menu, filter drawer |
| Tablet | 768px–1023px | 2–3 col grid, adapted nav |
| Desktop | 1024px+ | 4-col grid, sidebar filters, horizontal nav |

---

## 🧪 Seeded Products

The seed file populates **31 products** across three categories:

- **12 Fruits** — Apples, Bananas, Oranges, Grapes, Mangoes, Watermelon, Papaya, Pomegranate, Pineapple, Strawberries, Kiwi, Dragon Fruit
- **13 Vegetables** — Tomatoes, Potatoes, Onions, Carrots, Broccoli, Cauliflower, Spinach, Cabbage, Capsicum, Cucumbers, Green Chillies, Baby Corn, Zucchini
- **11 Flowers** — Red Roses, Pink Roses, Sunflowers, Tulips, White Lilies, Jasmine, Marigolds, Purple Orchids, Grand Bouquet, Pink Peonies, Lavender

---

## 🛒 Cart Features

- Add / remove items
- Increase / decrease quantities
- Persistent via localStorage
- Cart item count badge
- Sliding cart drawer
- Subtotal + delivery calculation
- Full cart page with order summary

---

## 🔮 Future Enhancements (Ready for Integration)

- User authentication (JWT)
- Razorpay / Stripe payment gateway
- Order management
- Wishlist persistence
- Product reviews
- Admin dashboard
