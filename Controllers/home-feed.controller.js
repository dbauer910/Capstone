const router = require('express').Router();
const HomeFeed = require("../models/home-feed");

const validateSession = require('../Middleware/validateSession');

function errorResponse(res, err){
    res.status(500).json({
        ERROR: err.message,
    });
};

router.get("/list", async (req, res) => {
  try {
    const getHomeFeed = await getHomeFeed.find(); // this should give me everything in the collection
    
    getHomeFeed.length > 0 ?
      res.status(200).json({ getHomeFeed })
      :
      res.status(404).json({ message: "No feed found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;