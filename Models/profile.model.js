const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    required: true,
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  bio: {
    type: String,
    required: false,
    max: 50,
  },

  image: {
    type: String,
    required: false,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;