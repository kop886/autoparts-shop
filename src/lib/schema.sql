-- Марки авто
CREATE TABLE IF NOT EXISTS car_brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Моделі авто
CREATE TABLE IF NOT EXISTS car_models (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand_id INTEGER NOT NULL REFERENCES car_brands(id),
  name TEXT NOT NULL
);

-- Модифікації (рік, кузов, двигун, об'єм)
CREATE TABLE IF NOT EXISTS car_modifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model_id INTEGER NOT NULL REFERENCES car_models(id),
  year_from INTEGER NOT NULL,
  year_to INTEGER,
  body_type TEXT NOT NULL,
  engine_type TEXT NOT NULL,
  engine_volume REAL NOT NULL
);

-- Категорії товарів (можуть бути вкладеними, як у dok.ua)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER REFERENCES categories(id),
  name_uk TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- Виробники запчастин
CREATE TABLE IF NOT EXISTS manufacturers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  country TEXT
);

-- Товари
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  manufacturer_id INTEGER NOT NULL REFERENCES manufacturers(id),
  name_uk TEXT NOT NULL,
  name_en TEXT NOT NULL,
  article_number TEXT NOT NULL UNIQUE,
  price REAL NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  description_uk TEXT,
  description_en TEXT
);

-- Сумісність: який товар підходить до якої модифікації авто
CREATE TABLE IF NOT EXISTS product_compatibility (
  product_id INTEGER NOT NULL REFERENCES products(id),
  modification_id INTEGER NOT NULL REFERENCES car_modifications(id),
  PRIMARY KEY (product_id, modification_id)
);

-- Користувачі
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Замовлення
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'processing', 'shipped', 'completed', 'cancelled')),
  total_price REAL NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Позиції замовлення (знімок ціни й назви на момент покупки)
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL
);