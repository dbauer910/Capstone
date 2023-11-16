const router = require("express").Router();
const Search = require("../Models/search.model");
const Profile = require("../Models/profile.model");
const validateSession = require("../Middleware/validateSession");

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
}


//* Get one recipe by ID in a search


//* Get all recipes in a search



module.exports = router;