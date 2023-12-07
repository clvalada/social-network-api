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

  getThoughtById: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      // Check if required fields are provided
      if (!thoughtText || !username) {
        return res.status(400).json({ error: 'Thought text and username are required' });
      }

      const newThought = new Thought({ thoughtText, username });
      const savedThought = await newThought.save();

      res.status(201).json(savedThought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { thoughtText } = req.body;

      // Check if thought text is provided
      if (!thoughtText) {
        return res.status(400).json({ error: 'Thought text is required' });
      }

      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });

      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;

      const deletedThought = await Thought.findByIdAndDelete(thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = ThoughtController;
