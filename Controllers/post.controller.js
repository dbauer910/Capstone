const router = require("express").Router();

const Post = require("../Models/post.model");
const User = require("../Models/profile.model");
const validateSession = require("../Middleware/validateSession");

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
}

//* Create a Post
router.post("/create/:id", validateSession,
async (req, res) => {
  try {
    const createPost = {
      recipeName: req.body.recipeName,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      notes: req.body.notes,
      user: req.user.id,
      //? coverPhoto: req.body.coverPhoto,
    };

    const post = new Post(createPost);
    const newPost = await post.save();

    res.status(200).json({
      message: "New Post Created!",
      newPost,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Update a Post
router.patch("/:id", validateSession, async (req, res) => {
  try {
    let userId = req.user.id;
    let post = req.params.id;
    let updatedInfo = req.body;

    const updated = await Post.findOneAndUpdate({_id: post, user: userId}, updatedInfo, {new: true});

    if (!updated)
     throw new Error("Invalid Post/User Combination")

    res.status(200).json({
      message: "Updated Post!",
      updated
    }); 
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Delete a Post
router.delete('/:id', validateSession, async function(req, res) {
  try {
    let {id} = req.params;
    let userId = req.user.id;

    const deletedPost = await Post.deleteOne({_id: id, user: userId});

    if(!deletedMessage.deletedCount) {
      throw new Error("Post Not Found!")
    }

    res.status(200).json({
      message: "Post Deleted!",
      deletedPost
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//* Get all Posts
router.get('/list/:id', async(req, res) => {
  try {
    const getAllPosts = await Post.find();
    getAllPosts.length > 0 ?
    res.status(200).json({getAllPosts})
    :
    res.status(404).json({message: "No Posts Found"})
  } catch (err) {
    errorResponse(res, err);
  }
});


module.exports = router;