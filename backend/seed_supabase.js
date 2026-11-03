const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('your-project')) {
  console.error('❌ Please set valid SUPABASE_URL and SUPABASE_ANON_KEY in your backend/.env file before running the seed script.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sampleProducts = [
  // FRUITS
  {
    name: 'Fresh Red Apples',
    description: 'Crisp, juicy red apples sourced from Himalayan orchards. Rich in fibre and antioxidants, perfect for snacking or baking.',
    category: 'fruits',
    subcategory: 'Apples',
    price: 149,
    original_price: 180,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80'],
    stock: 100,
    is_available: true,
    is_featured: true,
    rating: 4.6,
    review_count: 234,
    tags: ['apple', 'fresh', 'himalayan'],
  },
  {
    name: 'Cavendish Bananas',
    description: 'Sweet, creamy Cavendish bananas packed with potassium and natural energy. Ideal for smoothies, desserts and everyday snacking.',
    category: 'fruits',
    subcategory: 'Bananas',
    price: 49,
    original_price: null,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80'],
    stock: 200,
    is_available: true,
    is_featured: true,
    rating: 4.4,
    review_count: 312,
    tags: ['banana', 'tropical', 'energy'],
  },
  {
    name: 'Nagpur Oranges',
    description: 'India\'s finest Nagpur oranges - sweet, tangy and bursting with Vitamin C. Hand-picked at peak ripeness.',
    category: 'fruits',
    subcategory: 'Oranges',
    price: 89,
    original_price: 110,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80'],
    stock: 150,
    is_available: true,
    is_featured: false,
    rating: 4.5,
    review_count: 198,
    tags: ['orange', 'vitamin-c', 'nagpur'],
  },
  {
    name: 'Black Seedless Grapes',
    description: 'Plump, sweet black seedless grapes from Nashik vineyards. Perfect for salads, snacking and wine-making.',
    category: 'fruits',
    subcategory: 'Grapes',
    price: 129,
    original_price: 160,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=80'],
    stock: 80,
    is_available: true,
    is_featured: true,
    rating: 4.7,
    review_count: 156,
    tags: ['grapes', 'nashik', 'seedless'],
  },
  {
    name: 'Alphonso Mangoes',
    description: 'The king of mangoes - Alphonso from Ratnagiri. Intensely aromatic, saffron-yellow flesh with zero fibre.',
    category: 'fruits',
    subcategory: 'Mangoes',
    price: 599,
    original_price: 750,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80'],
    stock: 50,
    is_available: true,
    is_featured: true,
    rating: 4.9,
    review_count: 521,
    tags: ['mango', 'alphonso', 'ratnagiri', 'seasonal'],
  },
  // VEGETABLES
  {
    name: 'Country Tomatoes',
    description: 'Farm-fresh country tomatoes with deep red colour and robust flavour. Ideal for gravies, salads and chutneys.',
    category: 'vegetables',
    subcategory: 'Tomatoes',
    price: 39,
    original_price: null,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=800&q=80'],
    stock: 200,
    is_available: true,
    is_featured: true,
    rating: 4.3,
    review_count: 289,
    tags: ['tomato', 'fresh', 'country'],
  },
  {
    name: 'Potatoes (Jyoti)',
    description: 'Medium-sized Jyoti potatoes ideal for frying, boiling and curries. Smooth skin with starchy white flesh.',
    category: 'vegetables',
    subcategory: 'Potatoes',
    price: 35,
    original_price: 45,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80'],
    stock: 300,
    is_available: true,
    is_featured: false,
    rating: 4.2,
    review_count: 412,
    tags: ['potato', 'jyoti', 'starchy'],
  },
  {
    name: 'Red Onions',
    description: 'Pungent, firm red onions from Nashik. Essential base ingredient for every Indian kitchen.',
    category: 'vegetables',
    subcategory: 'Onions',
    price: 45,
    original_price: null,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80'],
    stock: 250,
    is_available: true,
    is_featured: false,
    rating: 4.4,
    review_count: 367,
    tags: ['onion', 'red', 'nashik'],
  },
  {
    name: 'Fresh Carrots',
    description: 'Crunchy orange carrots rich in beta-carotene and Vitamin A. Great for salads, juices and Indian halwa.',
    category: 'vegetables',
    subcategory: 'Carrots',
    price: 55,
    original_price: 70,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80'],
    stock: 120,
    is_available: true,
    is_featured: true,
    rating: 4.5,
    review_count: 143,
    tags: ['carrot', 'beta-carotene', 'crunchy'],
  },
  // FLOWERS
  {
    name: 'Red Roses Bunch',
    description: 'Classic fresh-cut red roses - the eternal symbol of love and passion. Each bunch contains 12 premium stems with full blooms.',
    category: 'flowers',
    subcategory: 'Red Roses',
    price: 299,
    original_price: 399,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1548093901-7da35b1cec3e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1548093901-7da35b1cec3e?w=800&q=80'],
    stock: 60,
    is_available: true,
    is_featured: true,
    rating: 4.9,
    review_count: 445,
    tags: ['rose', 'red', 'romantic', 'bunch'],
  },
  {
    name: 'Sunflowers Bunch',
    description: 'Bright, cheerful sunflowers that radiate warmth and positivity. Each bunch has 6 large golden blooms with long stems.',
    category: 'flowers',
    subcategory: 'Sunflowers',
    price: 199,
    original_price: null,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80'],
    stock: 45,
    is_available: true,
    is_featured: true,
    rating: 4.7,
    review_count: 198,
    tags: ['sunflower', 'cheerful', 'yellow', 'bunch'],
  },
  {
    name: 'Grand Floral Bouquet',
    description: 'Luxurious mixed bouquet with roses, lilies, sunflowers and baby\'s breath. Professionally arranged - perfect for all occasions.',
    category: 'flowers',
    subcategory: 'Flower Bouquets',
    price: 799,
    original_price: 999,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1487530811015-780b680a3f74?w=800&q=80'],
    stock: 20,
    is_available: true,
    is_featured: true,
    rating: 4.9,
    review_count: 289,
    tags: ['bouquet', 'mixed', 'luxury', 'gifting', 'occasion'],
  }
];

async function seedSupabase() {
  console.log('🌱 Seeding products into Supabase...');

  const { data, error } = await supabase
    .from('products')
    .insert(sampleProducts)
    .select();

  if (error) {
    console.error('❌ Supabase seed error:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully inserted ${data.length} products into Supabase!`);
  process.exit(0);
}

seedSupabase();
