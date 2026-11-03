const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Products in-memory store fallback if MongoDB is not running locally
let inMemoryProducts = [
  // FRUITS
  {
    _id: "660000000000000000000001",
    name: 'Fresh Red Apples',
    description: 'Crisp, juicy red apples sourced from Himalayan orchards. Rich in fibre and antioxidants, perfect for snacking or baking.',
    category: 'fruits',
    subcategory: 'Apples',
    price: 149,
    originalPrice: 180,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80'],
    stock: 100,
    isAvailable: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 234,
    tags: ['apple', 'fresh', 'himalayan'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000002",
    name: 'Cavendish Bananas',
    description: 'Sweet, creamy Cavendish bananas packed with potassium and natural energy. Ideal for smoothies, desserts and everyday snacking.',
    category: 'fruits',
    subcategory: 'Bananas',
    price: 49,
    originalPrice: null,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80'],
    stock: 200,
    isAvailable: true,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 312,
    tags: ['banana', 'tropical', 'energy'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000003",
    name: 'Nagpur Oranges',
    description: 'India\'s finest Nagpur oranges — sweet, tangy and bursting with Vitamin C. Hand-picked at peak ripeness.',
    category: 'fruits',
    subcategory: 'Oranges',
    price: 89,
    originalPrice: 110,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80'],
    stock: 150,
    isAvailable: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 198,
    tags: ['orange', 'vitamin-c', 'nagpur'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000004",
    name: 'Black Seedless Grapes',
    description: 'Plump, sweet black seedless grapes from Nashik vineyards. Perfect for salads, snacking and wine-making.',
    category: 'fruits',
    subcategory: 'Grapes',
    price: 129,
    originalPrice: 160,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=80'],
    stock: 80,
    isAvailable: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 156,
    tags: ['grapes', 'nashik', 'seedless'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000005",
    name: 'Alphonso Mangoes',
    description: 'The king of mangoes — Alphonso from Ratnagiri. Intensely aromatic, saffron-yellow flesh with zero fibre. Limited seasonal stock.',
    category: 'fruits',
    subcategory: 'Mangoes',
    price: 599,
    originalPrice: 750,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80'],
    stock: 50,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: true,
    rating: 4.9,
    reviewCount: 521,
    tags: ['mango', 'alphonso', 'ratnagiri', 'seasonal'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000006",
    name: 'Watermelon (Whole)',
    description: 'Farm-fresh watermelons with crisp, sweet red flesh and high water content. Ideal for summer hydration.',
    category: 'fruits',
    subcategory: 'Watermelons',
    price: 199,
    originalPrice: null,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80'],
    stock: 60,
    isAvailable: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 87,
    tags: ['watermelon', 'summer', 'hydrating'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000007",
    name: 'Ripe Papayas',
    description: 'Golden-orange papayas packed with papain enzyme, Vitamin A and C. Smooth tropical flavour with silky texture.',
    category: 'fruits',
    subcategory: 'Papayas',
    price: 69,
    originalPrice: null,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&q=80'],
    stock: 90,
    isAvailable: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 64,
    tags: ['papaya', 'tropical', 'digestive'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000008",
    name: 'Pomegranate',
    description: 'Ruby-red pomegranates from Solapur — jewel-like arils bursting with antioxidants and natural sweetness.',
    category: 'fruits',
    subcategory: 'Pomegranates',
    price: 179,
    originalPrice: 220,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1562447457-579fc34967fb?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1562447457-579fc34967fb?w=800&q=80'],
    stock: 70,
    isAvailable: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 203,
    tags: ['pomegranate', 'antioxidant', 'solapur'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000009",
    name: 'Fresh Pineapple',
    description: 'Tangy-sweet whole pineapples imported from Kerala. Rich in Vitamin C and bromelain for digestion.',
    category: 'fruits',
    subcategory: 'Pineapples',
    price: 99,
    originalPrice: null,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80'],
    stock: 55,
    isAvailable: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 92,
    tags: ['pineapple', 'tropical', 'bromelain'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000010",
    name: 'Fresh Strawberries',
    description: 'Bright red, sweet-tart Mahabaleshwar strawberries. Perfect for desserts, smoothies and snacking.',
    category: 'fruits',
    subcategory: 'Strawberries',
    price: 149,
    originalPrice: 190,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80'],
    stock: 45,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: true,
    rating: 4.7,
    reviewCount: 178,
    tags: ['strawberry', 'mahabaleshwar', 'seasonal', 'berry'],
    createdAt: new Date().toISOString()
  },
  // VEGETABLES
  {
    _id: "660000000000000000000011",
    name: 'Country Tomatoes',
    description: 'Farm-fresh country tomatoes with deep red colour and robust flavour. Ideal for gravies, salads and chutneys.',
    category: 'vegetables',
    subcategory: 'Tomatoes',
    price: 39,
    originalPrice: null,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=800&q=80'],
    stock: 200,
    isAvailable: true,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 289,
    tags: ['tomato', 'fresh', 'country'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000012",
    name: 'Potatoes (Jyoti)',
    description: 'Medium-sized Jyoti potatoes ideal for frying, boiling and curries. Smooth skin with starchy white flesh.',
    category: 'vegetables',
    subcategory: 'Potatoes',
    price: 35,
    originalPrice: 45,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80'],
    stock: 300,
    isAvailable: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 412,
    tags: ['potato', 'jyoti', 'starchy'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000013",
    name: 'Red Onions',
    description: 'Pungent, firm red onions from Nashik. Essential base ingredient for every Indian kitchen.',
    category: 'vegetables',
    subcategory: 'Onions',
    price: 45,
    originalPrice: null,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80'],
    stock: 250,
    isAvailable: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 367,
    tags: ['onion', 'red', 'nashik'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000014",
    name: 'Fresh Carrots',
    description: 'Crunchy orange carrots rich in beta-carotene and Vitamin A. Great for salads, juices and Indian halwa.',
    category: 'vegetables',
    subcategory: 'Carrots',
    price: 55,
    originalPrice: 70,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80'],
    stock: 120,
    isAvailable: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 143,
    tags: ['carrot', 'beta-carotene', 'crunchy'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000015",
    name: 'Broccoli',
    description: 'Fresh green broccoli florets packed with fibre, Vitamin C and K. Steam, stir-fry or use raw in salads.',
    category: 'vegetables',
    subcategory: 'Broccoli',
    price: 79,
    originalPrice: 100,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&q=80'],
    stock: 80,
    isAvailable: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 98,
    tags: ['broccoli', 'superfood', 'green'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000016",
    name: 'White Cauliflower',
    description: 'Dense, snow-white cauliflower heads — perfect for aloo gobi, cauliflower rice and roasted dishes.',
    category: 'vegetables',
    subcategory: 'Cauliflower',
    price: 59,
    originalPrice: null,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&q=80'],
    stock: 90,
    isAvailable: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 75,
    tags: ['cauliflower', 'white', 'versatile'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000017",
    name: 'Fresh Spinach',
    description: 'Tender baby spinach leaves washed and ready to use. Excellent source of iron, calcium and folate.',
    category: 'vegetables',
    subcategory: 'Spinach',
    price: 29,
    originalPrice: null,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80'],
    stock: 150,
    isAvailable: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 211,
    tags: ['spinach', 'leafy', 'iron', 'palak'],
    createdAt: new Date().toISOString()
  },
  // FLOWERS
  {
    _id: "660000000000000000000018",
    name: 'Red Roses Bunch',
    description: 'Classic fresh-cut red roses — the eternal symbol of love and passion. Each bunch contains 12 premium stems with full blooms.',
    category: 'flowers',
    subcategory: 'Red Roses',
    price: 299,
    originalPrice: 399,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1548093901-7da35b1cec3e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1548093901-7da35b1cec3e?w=800&q=80'],
    stock: 60,
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 445,
    tags: ['rose', 'red', 'romantic', 'bunch'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000019",
    name: 'Pink Roses Bunch',
    description: 'Delicate pink roses conveying admiration, grace and gratitude. Each bunch contains 12 fully opened stems.',
    category: 'flowers',
    subcategory: 'Pink Roses',
    price: 279,
    originalPrice: 349,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1587556930799-8dca6fad6d43?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587556930799-8dca6fad6d43?w=800&q=80'],
    stock: 55,
    isAvailable: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 312,
    tags: ['rose', 'pink', 'elegant', 'bunch'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000020",
    name: 'Sunflowers Bunch',
    description: 'Bright, cheerful sunflowers that radiate warmth and positivity. Each bunch has 6 large golden blooms with long stems.',
    category: 'flowers',
    subcategory: 'Sunflowers',
    price: 199,
    originalPrice: null,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80'],
    stock: 45,
    isAvailable: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 198,
    tags: ['sunflower', 'cheerful', 'yellow', 'bunch'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000021",
    name: 'Mixed Tulips',
    description: 'Vibrant mixed-colour tulips from Dutch imports. Available in red, yellow, pink and purple. Sold in bunches of 10.',
    category: 'flowers',
    subcategory: 'Tulips',
    price: 349,
    originalPrice: 449,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc8a?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1490750967868-88df5691cc8a?w=800&q=80'],
    stock: 35,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: true,
    rating: 4.8,
    reviewCount: 234,
    tags: ['tulip', 'dutch', 'mixed', 'seasonal'],
    createdAt: new Date().toISOString()
  },
  {
    _id: "660000000000000000000022",
    name: 'Grand Floral Bouquet',
    description: 'Luxurious mixed bouquet with roses, lilies, sunflowers and baby\'s breath. Professionally arranged — perfect for all occasions.',
    category: 'flowers',
    subcategory: 'Flower Bouquets',
    price: 799,
    originalPrice: 999,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=800&q=80'],
    stock: 20,
    isAvailable: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 289,
    tags: ['bouquet', 'mixed', 'luxury', 'gifting', 'occasion'],
    createdAt: new Date().toISOString()
  }
];

let isDbConnected = false;

// Custom router or middleware for mock in-memory fallback
app.use('/api/products', (req, res, next) => {
  if (isDbConnected) {
    return next();
  }

  // Handle fallback in-memory requests
  if (req.path === '/categories') {
    const categories = ['fruits', 'vegetables', 'flowers'].map(cat => ({
      _id: cat,
      count: inMemoryProducts.filter(p => p.category === cat).length
    }));
    return res.json({ success: true, data: categories });
  }

  if (req.params.id || (req.path !== '/' && req.path.length > 1)) {
    const id = req.path.replace('/', '');
    const product = inMemoryProducts.find(p => p._id === id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    const related = inMemoryProducts.filter(p => p.category === product.category && p._id !== id).slice(0, 4);
    return res.json({ success: true, data: product, related });
  }

  // List query handling
  const { search, category, minPrice, maxPrice, isAvailable, sort, order, page = 1, limit = 12, featured } = req.query;
  let result = [...inMemoryProducts];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (category && category !== 'all') {
    result = result.filter(p => p.category === category.toLowerCase());
  }
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  if (isAvailable !== undefined) result = result.filter(p => String(p.isAvailable) === isAvailable);
  if (featured === 'true') result = result.filter(p => p.isFeatured);

  if (sort === 'price') {
    result.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const totalCount = result.length;
  const paginated = result.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  return res.json({
    success: true,
    data: paginated,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      totalCount,
      hasNextPage: pageNum * limitNum < totalCount,
      hasPrevPage: pageNum > 1,
      limit: limitNum,
    }
  });
});

// Real Mongo routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FreshBasket API is running', dbConnected: isDbConnected });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/freshbasket';

// Start server first so frontend never hangs
app.listen(PORT, () => {
  console.log(`🚀 FreshBasket Server running on http://localhost:${PORT}`);
});

// Attempt MongoDB connection asynchronously
mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    isDbConnected = true;
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.log('ℹ️ Local MongoDB not detected or offline. Running seamlessly on embedded catalog dataset.');
  });

module.exports = app;
