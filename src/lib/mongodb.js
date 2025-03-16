import mongoose from "mongoose";

//ensures sngle connection to db

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env file");

let cached = global.mongoose || { conn: null, promise: null };

/**
 * Function to connect database
 * @returns connection: stored in cache
 */
async function connectDB() {
  if (cached.conn) return cached.conn;
  const dbName=process.env.DB_NAME;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}${dbName}?retryWrites=true&w=majority`, {
      dbName,
    });
  }
  
  cached.conn = await cached.promise;

  // Ensure indexes exist (create index for userId in File collection)
  await File.createIndexes({ userId: 1 });
  console.log("[INFO] Index created on userId field");
  
  return cached.conn;
}

export default connectDB;
