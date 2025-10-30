import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'ecommerce_db';

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip and titanium design",
    price: 999,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1696446702880-67b9daf4c26e?w=500",
    stock: 50,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Samsung Galaxy S24",
    description: "Flagship Samsung phone with AI features",
    price: 899,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    stock: 45,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Google Pixel 8",
    description: "Google's flagship with best-in-class camera",
    price: 699,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    stock: 30,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "OnePlus 12",
    description: "Flagship killer with Snapdragon 8 Gen 3",
    price: 799,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    stock: 40,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "iPhone 14",
    description: "Previous generation iPhone at great value",
    price: 699,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500",
    stock: 60,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const sampleCategories = [
  {
    name: "Smartphones",
    description: "Latest mobile phones from top brands",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Accessories",
    description: "Phone cases, chargers, and more",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Tablets",
    description: "Tablets and iPads",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Clear existing data
    await db.collection('products').deleteMany({});
    await db.collection('categories').deleteMany({});
    await db.collection('users').deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const categoryResult = await db.collection('categories').insertMany(sampleCategories);
    console.log(`Inserted ${categoryResult.insertedCount} categories`);

    // Insert products
    const productResult = await db.collection('products').insertMany(sampleProducts);
    console.log(`Inserted ${productResult.insertedCount} products`);

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = {
      name: 'Admin',
      email: 'admin@phone4n.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('users').insertOne(adminUser);
    console.log('Created admin user');

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = {
      name: 'John Doe',
      email: 'user@example.com',
      password: userPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('users').insertOne(regularUser);
    console.log('Created regular user');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@phone4n.com');
    console.log('Password: admin123');
    console.log('\nUser credentials:');
    console.log('Email: user@example.com');
    console.log('Password: user123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();
