// index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load variables from .env file

const app = express();

// Log the MongoDB URI
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI);

// Define your routes here

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
