const mongoose = require('mongoose');

constProfileSchema = new mongoose.Schema ({

  // user: { 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'user'
  firstName: {
    type: String,
    required: true
  },

  lastName:{
    type: String,
    required: true
  },

  email:{
    required: true,
    type: String,
    unique: true
  },

  password:{
    type: String,
    required: true
  },

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