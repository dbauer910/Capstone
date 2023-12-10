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

ProfileSchema.pre('validate', function (next) {
  // Check if the document is new (creation) or not (update)
  if (!this.isNew) {
    // Allow certain fields to be optional during update
    this.firstName = this.firstName || undefined;
    this.lastName = this.lastName || undefined;
    this.email = this.email || undefined;
    this.password = this.password || undefined;
    this.username = this.username || undefined;
    //this.bio = this.bio || undefined;  // bio is already not required in the schema
    // this.image = this.image || undefined; // image is already not required in the schema
  }

  next();
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;