const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/usersRoutes');
const thoughtsRoutes = require('./routes/thoughtsRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config(); // Load variables from .env file
const app = express();

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI);

// Use middleware
app.use(express.json());

// Define routes
app.use('/api', usersRoutes);
app.use('/api', thoughtsRoutes);

// Use error handling middleware
app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
