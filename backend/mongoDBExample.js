// mongodbExample.js
import mongoose from "mongoose";

// Read connection string from environment variable
const MONGO_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

async function run() {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected successfully!");

    // Insert 10 users with timestamps
    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `User${i}`,
        email: `user${i}@example.com`,
        createdAt: new Date(Date.now() - i * 60000),
      });
    }

    const insertedUsers = await User.insertMany(users);
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Fetch 5 most recent
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    console.log("🟢 Recent Users:", recentUsers);

    // Fetch one by _id
    const oneUser = await User.findById(recentUsers[0]._id);
    console.log("🟢 One User by _id:", oneUser);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Connection closed");
  }
}

run();
