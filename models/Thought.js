// models/Thought.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reaction',
    },
  ],
});

// Create virtual reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Add a getter method to format the timestamp on query
thoughtSchema.set('toJSON', {
  getters: true,
  virtuals: true,
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
