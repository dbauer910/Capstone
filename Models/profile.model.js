const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema ({

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
      unique: true
    },

  bio: {
    type: String,
    required: false,
    max: 50
  },

  image: {
    type: String, 
    required: false
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);