

const Profile = require ('../Models/profile.model');

//? Creat a New Profile
const createProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;

    //? If the username already exists 
    const existingProfile = await

    Profile.findOne({ username });
    if (existingProfile) {
      return res.status(400).json({ error:'Username already exists' });
    }

    //? Create a new profile
    const newProfile = new Profile({
      username,
      bio
    });

    //? Save profile to database
    await newProfile.save();

    res.status(201).json(newProfile);
  } catch (errpr) {
    console.error(error);
    res.status(500).json({ error:'Server error'});
  }
};

    //? Get all profiles 
    const getAllProfiles = async (req, res) => {
      try {
        const profiles = await Profile.find();
        res.json(profile);
      } catch (error) {
        console.error(error);
        res,status(500).json({ error:'Server error'});
      }
    };

    //? Get a profile by username
    const getProfileByUsername = async(req, res) => {
      try {
        const { username } = req.params;

        const profile = await 
        Profile.findOne({ username });
        if (!profile) {
          return res.status(404).json({ error:'Profile not found'});
        }

        res.json(profile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'});
      }
    };

    //? Update a profile by username
    const updateProfileByUsername = async (req,res) => {
      try {
        const { username } = req.params;
        const { bio } = req.body;

        const profile = await
        Profile.findOne({ username });
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found'});
        }

        profile.bio = bio;
        await profile.save();

        res.json(profile);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error:'Server error'});
      }
    };

    //? Delete a profile by username 
    const deletePeofileByUsername = async (req, res) => {
      try {
        const { username } = req.params;

        const profile = await
        Profile.findOne({ username });
        if(!profile) {
          return res.status(404).json({ error: 'Profile not found'});
        }

        await profile.remove();

        res.json({ message: 'Profile deleted'});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'});
      }
    };


module.exports = { 
  createProfile, 
  getAllProfiles, 
  getProfileByUsername, 
  updateProfileByUsername, 
  deletePeofileByUsername};