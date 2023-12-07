const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
