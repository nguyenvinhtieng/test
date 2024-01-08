const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    return "Connect to DB OK";
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { connectDB };