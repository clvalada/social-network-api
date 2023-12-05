// models.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define Mongoose models for your data
const userSchema = new Schema({
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const thoughtSchema = new Schema({
  // Define thought schema
});

const User = model('User', userSchema);
const Thought = model('Thought', thoughtSchema);
