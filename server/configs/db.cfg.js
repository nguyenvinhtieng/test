const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://buimyy2909:RrkVjJcvugxsianA@project.pvfkoao.mongodb.net";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = connectDB ;