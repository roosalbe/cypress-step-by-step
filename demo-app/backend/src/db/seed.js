import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '../data');
const dbFile = join(dataDir, 'db.json');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Generate password hashes
const hashPassword = (password) => bcrypt.hashSync(password, 10);

// Seed data
const seedData = {
  users: [
    {
      id: uuidv4(),
      email: 'student@test.nl',
      password: hashPassword('cypress123'),
      name: 'Student User',
      firstName: 'Student',
      lastName: 'User',
      role: 'user',
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      email: 'admin@test.nl',
      password: hashPassword('admin123'),
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      email: 'tester@test.nl',
      password: hashPassword('test123'),
      name: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      createdAt: new Date().toISOString()
    },
    // Also add TaskFlow users for backwards compatibility
    {
      id: uuidv4(),
      email: 'test@taskflow.com',
      password: hashPassword('Test123!'),
      name: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      email: 'admin@taskflow.com',
      password: hashPassword('Admin123!'),
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ],
  products: [
    {
      id: uuidv4(),
      name: 'Laptop Pro 15"',
      description: 'Krachtige laptop voor professionals met 16GB RAM en 512GB SSD.',
      price: 1299.99,
      category: 'electronics',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Wireless Mouse',
      description: 'Ergonomische draadloze muis met lange batterijduur.',
      price: 49.99,
      category: 'electronics',
      stock: 50,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub met HDMI, USB-A en SD kaartlezer.',
      price: 79.99,
      category: 'electronics',
      stock: 30,
      image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Mechanical Keyboard',
      description: 'RGB mechanisch toetsenbord met Cherry MX switches.',
      price: 129.99,
      category: 'electronics',
      stock: 25,
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Monitor 27"',
      description: '4K IPS monitor met USB-C aansluiting.',
      price: 349.99,
      category: 'electronics',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Webcam HD',
      description: '1080p webcam met ingebouwde microfoon.',
      price: 89.99,
      category: 'electronics',
      stock: 40,
      image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Cypress T-Shirt',
      description: 'Comfortabel katoenen t-shirt met Cypress logo.',
      price: 24.99,
      category: 'clothing',
      stock: 100,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Developer Hoodie',
      description: 'Warme hoodie voor developers, "It works on my machine".',
      price: 59.99,
      category: 'clothing',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Testing Book',
      description: 'Uitgebreide gids voor testautomatisering.',
      price: 39.99,
      category: 'books',
      stock: 60,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Cypress Stickers',
      description: 'Set van 10 Cypress stickers voor je laptop.',
      price: 9.99,
      category: 'accessories',
      stock: 200,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Standing Desk',
      description: 'Elektrisch verstelbaar sta-bureau.',
      price: 499.99,
      category: 'furniture',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Ergonomic Chair',
      description: 'Ergonomische bureaustoel met lumbaalsteun.',
      price: 299.99,
      category: 'furniture',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Headphones',
      description: 'Noise-cancelling koptelefoon - UITVERKOCHT',
      price: 199.99,
      category: 'electronics',
      stock: 0,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Coffee Mug',
      description: '"First, solve the problem. Then, write the code." mok.',
      price: 14.99,
      category: 'accessories',
      stock: 150,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop'
    },
    {
      id: uuidv4(),
      name: 'Desk Lamp',
      description: 'LED bureaulamp met verstelbare helderheid.',
      price: 44.99,
      category: 'accessories',
      stock: 35,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop'
    }
  ],
  carts: [],
  orders: []
};

// Write seed data
writeFileSync(dbFile, JSON.stringify(seedData, null, 2));
console.log('✅ Database seeded successfully!');
console.log(`   - ${seedData.users.length} users`);
console.log(`   - ${seedData.products.length} products`);
console.log(`   📁 Location: ${dbFile}`);
