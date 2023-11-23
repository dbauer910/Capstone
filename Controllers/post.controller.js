const router = require("express").Router();

const Post = require("../Models/post.model");
const Profile = require("../Models/profile.model");
const validateSession = require("../Middleware/validateSession");

const jwt = require('jsonwebtoken');

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
}

//! Create a Post
router.post("/", async (req, res) => {
  try {
    const createPost = {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      notes: req.body.notes,
      coverPhoto: req.body.coverPhoto,
      username: req.body.username,
    };

    const post = new Post(createPost);

    const newPost = await post.save();

    const token = jwt.sign({ id: newPost._id }, process.env.JWT, {
      expiresIn: "1 day",
    });

    res.status(200).json({
      message: "New Post Created!",
    post: newPost,
    token,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Update a Post
router.patch("/:id", validateSession, async (req, res) => {
  try {
    let _id = req.params;
    let userId = req.username;
    // let post = req.params.id;
    let updatedInfo = req.body;

    const updated = await Post.findOneAndUpdate(
      { _id, userId },
      updatedInfo, {
        new: true, 
      });

    if (!updated) throw new Error("Invalid Post/Profile Combination");

    res.status(200).json({
      message: "Updated Post!",
      updated,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Delete a Post
router.delete("/:id", validateSession ,async function (req, res) {
  try {
    let { id } = req.params;
      let username = req.username;

    const deletedPost = await Post.deleteOne({ _id: id, username: username });

    if (!deletedPost.deletedCount) {
      throw new Error("Post Not Found!");
    }

    res.status(200).json({
      message: "Post Deleted!!!",
      deletedPost,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get All Posts
router.get("/post/list", async (req, res) => {
  try {
    const getAllPosts = await Post.find();
    getAllPosts.length > 0
      ? res.status(200).json({ getAllPosts })
      : res.status(404).json({ message: "No Posts Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get All Posts by Username
router.get("/post/list/:username", async (req, res) => {
  try {
    const getAllPostsUsername = await Post.find();
    getAllPostsUsername.length > 0
      ? res.status(200).json({ getAllPostsUsername })
      : res.status(404).json({ message: "No Posts Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;