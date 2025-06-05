const mongoose = require("mongoose");

/**
 * Connects the application to MongoDB Atlas using Mongoose.
 *
 * Reads connection URI from process.env.MONGO_URI.
 * On failure, logs the error and exits process.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} If unable to connect to MongoDB.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
