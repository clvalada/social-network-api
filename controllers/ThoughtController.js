// controllers/ThoughtController.js

const mongoose = require('mongoose');
const Thought = require('../models/Thought');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

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

      await User.findByIdAndUpdate(
        savedThought.username,
        { $push: { thoughts: savedThought._id } }
      );

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

      await User.findByIdAndUpdate(
        deletedThought.username,
        { $pull: { thoughts: thoughtId } }
      );

      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody, username } = req.body;

      if (!reactionBody || !username) {
        return res.status(400).json({ error: 'Reaction body and username are required' });
      }

      const newReaction = new Reaction({ reactionBody, username });
      const savedReaction = await newReaction.save();

      await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: savedReaction._id } }
      );

      res.status(201).json(savedReaction);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const isValidReactionId = mongoose.Types.ObjectId.isValid(reactionId);
      if (!isValidReactionId) {
        return res.status(400).json({ error: 'Invalid reactionId' });
      }

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: reactionId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = ThoughtController;
