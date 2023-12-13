const router = require("express").Router();

const Post = require("../Models/post.model");
const Profile = require("../Models/profile.model");
const validateSession = require("../Middleware/validateSession");

const jwt = require("jsonwebtoken");

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
}

//* Create a Post
router.post("/", validateSession, async (req, res) => {
  try {

    const userId = req.profile._id;
    console.log("PROFILE FROM ADD POST:", req.profile);
    const createPost = {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      notes: req.body.notes,
      coverPhoto: req.body.coverPhoto,
      username: req.profile.username,
      userId: userId 
    };

    const post = new Post(createPost);

    const newPost = await post.save();

    res.status(200).json({
      message: "New Post Created!",
      post: newPost,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Update a Post
router.patch("/:id", validateSession, async (req, res) => {
  try {
    let { id } = req.params;
    let updatedInfo = req.body;

    const updated = await Post.findOneAndUpdate({ _id: id }, updatedInfo, {
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

//* Delete a Post
router.delete("/:id", validateSession, async function (req, res) {
  try {
    let { id } = req.params;

    const deletedPost = await Post.deleteOne({ _id: id });

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

//* Get All Posts
router.get("/list", async (req, res) => {
  try {
    const getAllPosts = await Post.find();
    getAllPosts.length > 0
      ? res.status(200).json({ getAllPosts })
      : res.status(404).json({ message: "No Posts Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Get All Posts by User Id
router.get("/list/:userId", validateSession, async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Received userId:", userId);
    console.log("Profile:", req.profile);

    const getAllPostsUserId = await Post.find({ userId: userId });
    console.log('getAllPostsUserId:', getAllPostsUserId);

    getAllPostsUserId.length > 0
      ? res.status(200).json({ getAllPostsUserId })
      : res.status(404).json({ message: "No Posts Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;