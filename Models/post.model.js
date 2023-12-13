const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 100,
    //? Limit the length / # of characters in description?
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
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile.model", // Reference the Profile model
    required: true,
  },
  username: {
    type: String,
    required: true
  },
},

  { timestamps: true }
                                       
);

module.exports = mongoose.model("Post", PostSchema);