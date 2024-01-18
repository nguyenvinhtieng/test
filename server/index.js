require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');
const router = require('./routes/index')
const app = express();
const connectDB = require('./configs/db.cfg')
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(MONGODB_URI);

// const db = mongoose.connection;

connectDB()
app.use(router)
// db.on('connected', () => {
//     console.log('Successfully connected to MongoDB Atlas');
// });

// db.on('error', err => {
//     console.error(`Error connected to MongoDB Atlas: ${err}`);
// });

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
