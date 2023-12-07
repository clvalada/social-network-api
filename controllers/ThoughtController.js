// ThoughtController.js

const Thought = require('../models/Thought');

const ThoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = ThoughtController;
