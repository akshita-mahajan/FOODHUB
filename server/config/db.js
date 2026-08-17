const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Full Error:");
    console.error(error);          // <-- Full error object
    console.error(error.stack);    // <-- Stack trace
    process.exit(1);
  }
};

module.exports = connectDB;