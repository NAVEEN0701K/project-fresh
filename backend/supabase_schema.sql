-- Supabase SQL Schema for FreshBasket Products Table

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('fruits', 'vegetables', 'flowers')),
  subcategory VARCHAR(100),
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  unit VARCHAR(50) NOT NULL CHECK (unit IN ('kg', 'dozen', 'piece', 'bunch', 'gram', 'litre', 'pack')),
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0 NOT NULL,
  is_available BOOLEAN DEFAULT true NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  is_seasonal BOOLEAN DEFAULT false NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Allow public read access to products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
