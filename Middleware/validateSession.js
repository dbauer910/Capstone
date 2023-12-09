const jwt = require("jsonwebtoken");

const Profile = require("../Models/profile.model");

async function validateSession(req, res, next) {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, process.env.JWT);
    console.log("Decoded Token:", decoded);

    const profile = await Profile.findOne({username: decoded.username});
    console.log(profile);

    if (!profile) throw new Error("Profile Not Found");

    req.profile = profile;
    console.log("PROFILE", profile);
    //req.username = profile;

    return next();
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
}

module.exports = validateSession;