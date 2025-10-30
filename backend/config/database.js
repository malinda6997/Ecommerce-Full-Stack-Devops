import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "ecommerce_db";

let client;
let db;

export const connectDB = async () => {
  try {
    if (db) {
      console.log("MongoDB already connected");
      return db;
    }

    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    console.log("✅ MongoDB connected successfully");

    db = client.db(dbName);

    // Create indexes for better performance
    await createIndexes();

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // Products collection indexes
    await db
      .collection("products")
      .createIndex({ name: "text", description: "text" });
    await db.collection("products").createIndex({ category: 1 });
    await db.collection("products").createIndex({ price: 1 });

    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    // Orders collection indexes
    await db.collection("orders").createIndex({ userId: 1 });
    await db.collection("orders").createIndex({ createdAt: -1 });

    console.log("✅ Database indexes created");
  } catch (error) {
    console.log("Index creation skipped or already exists");
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

// Handle process termination
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
