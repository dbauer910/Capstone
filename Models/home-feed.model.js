const mongoose = require("mongoose");

const HomeFeedSchema = new mongoose.Schema({
  //* or do I need something else in here? Just not sure exactly what's going to need to be in the HomeFeedSchema
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("HomeFeed", HomeFeedSchema);