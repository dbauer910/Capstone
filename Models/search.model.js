const mongoose = require("mongoose");

const SearchSchema = new mongoose.Schema({
  //* Not entirely sure what we want in a SearchSchema or if other info is needed in here
  profileId: {
    type: String,
    required: false
  },
  postId: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model("Search", SearchSchema);