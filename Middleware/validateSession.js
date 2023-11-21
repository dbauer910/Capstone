const jwt = require("jsonwebtoken");
const Profile = require("../Models/profile.model");

async function validateSession(req, res, next) {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, process.env.JWT);

    const profile = await Profile.findById(decoded.id);

    if (!profile) throw new Error("Profile Not Found");

    req.user = profile;

    return next();
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
}

module.exports = validateSession;