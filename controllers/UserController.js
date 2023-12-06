// UserController.js

const User = require('../models/User');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username } = req.body;

      // Check if the username is provided
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const newUser = new User({ username });
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { username } = req.body;

      // Check if the username is provided
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Add more controller methods as needed
};

module.exports = UserController;
