const router = require("express").Router();
const Profile = require("../Models/profile.model");
const validateSession = require("../Middleware/validateSession");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
}

//? Is encryptPassword needed or is line 27 sufficient?
/* const encryptPassword = (password) => {
  const encrypt = bcrypt.hashSync(password, 10);
  console.log("ENCRYPT:", encrypt);
}; */

//* Create a New Profile
router.post("/signup", async (req, res) => {
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

//* User Login to Profile
router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const profile = await Profile.findOne({ email: email });

    if (!profile) throw new Error("Email or Password does not match");

    //? 3 - create a json web token
    const token = jwt.sign({ id: profile._id }, process.env.JWT, {
      expiresIn: "1 day",
    });

    //? 4 - check if the passwords are the same
    const passwordMatch = await bcrypt.compare(password, profile.password);

    if (!passwordMatch) throw new Error("Email or Password does not match");

    //? 5 - send a response
    res.status(200).json({
      profile,
      message: "Successful Login!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

//* Get All Profiles
router.get('/list', async(req, res) => {
try {
  const getAllProfiles = await Profile.find();
  getAllProfiles.length > 0 ?
  res.status(200).json({getAllProfiles})
  :
  res.status(404).json({message: "No Profiles Found"})
  } catch (err) {
    errorResponse(res, err);
  }  
});

//! Get a Profile by Username
router.get("/profile/:username", async (req, res) => {
  try {
    const getProfileByUsername = await Profile.findOne({username}) 
    const { username } = req.params.username;
    const profile = await Profile.findByUsername({ getProfileByUsername });
    
    if (!Profile) throw new Error("Profile Not Found");

    res.status(200).json({found: profile, username: username});
  } catch (err) {
    errorResponse(res,err);
  }
});

//! We need to get the validateSession working correctly on the update and delete a profile. That is why I was getting the jwt malformed error. So we can update or delete a profile without a token for authorization, but when we include validateSession in the router method then update or delete profile do not work. 

//* Update a Profile by Username
router.patch("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const  updatedProfile  = req.body;

    const updated = await Profile.findOneAndUpdate({ username },
      updatedProfile, {
        new: true,
      });

      if (!updated) throw new Error("Invalid Profile/Username");

      res.status(200).json({ message: 'Profile Updated!!!', updated,
    });

  } catch (err) {
    errorResponse(res, err);
  }
});

//* Delete a Profile by Username
router.delete("/:username", validateSession, async function (req, res) {
  try {
    const { username } = req.params;

    const deletedProfile = await Profile.deleteOne({ username });

    if (!deletedProfile.deletedCount) {
      throw new Error("No Profile");
    }

    res.status(200).json({ 
      message: "Profile Deleted", 
      deletedProfile });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;