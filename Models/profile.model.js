const mongoose = require('mongoose');

constProfileSchema = new mongoose.Schema ({

  // user: { 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'user'
  
    username: {
      type: String,
      required: true,
      unique: true,
    },

  bio: {
    type:String,
    required: true,
    max: 50
  },

  date: {
    type: Date,
    required: true,
  },

  Image: { 
    required: false
  },
});

module.exports = mongoose.module('Profile', ProfileSchema);