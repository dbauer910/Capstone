const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    // Limit length / # of characters?
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: Image,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Post", PostSchema);