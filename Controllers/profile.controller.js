const router = require("express").Router();
const Profile = require("../Models/profile.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const encryptPassword = (password) => {
  const encrypt = bcrypt.hashSync(password, 10);
  console.log("ENCRYPT:", encrypt);
};

//* Create a New Profile
router.post("/", async (req, res) => {
  try {
    const profile = new Profile({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
      username: req.body.username,
      bio: req.body.bio,
    });
    //? Save profile to database
    const newProfile = await profile.save();
    //await newProfile.save(); maybe need maybe not this line
    const token = jwt.sign({ id: newProfile._id }, process.env.JWT, {
      expiresIn: "1 day",
    });

    res.status(201).json({
      profile: newProfile,
      message: "Success! Profile Created!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

//? Check If the username already exists - we may need this
/* Profile.findOne({ username });
    if (existingProfile) {
      return res.status(400).json({ error:'Username already exists' });
    }
   
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:'Server error'});
  } */

//! User Login to Profile
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const profile = await Profile.findOne({ email: email });

    if (!profile) throw new Error("Email or Password does not match");

    //? 3 - create a json web token
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1 day",
    });

    //? 4 - check if the passwords are the same
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Email or Password does not match");

    //? 5 - send a response
    res.status(200).json({
      user,
      message: "Successful Login!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

//! Get All Profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//! Get a Profile by Username
const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//! Update a Profile by Username
const updateProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { bio } = req.body;

    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    profile.bio = bio;
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//! Delete a Profile by Username
const deleteProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profile.remove();

    res.json({ message: "Profile deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = router;