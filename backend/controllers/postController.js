import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  console.log("i am in create post controller");
  try {
    // fetch the user
    const userId = req.userId;
    // check user exist or not

    // fetch the post from req.body
    const { title } = req.body;
    // post is empty or not
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }
    const newPost = await Post.create({
      user: userId,
      title: title.trim(),
    });
    return res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.log("Error while creating createPost: ", error);
    return res
      .status(500)
      .json({ message: error?.message || "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.userId; // or req.user.id
    const { postId } = req.params;

    // ✅ Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ Check if already liked
    const alreadyLiked = post.likes.find(
      (like) => like.user.toString() === userId,
    );

    if (alreadyLiked) {
      // ❌ Unlike
      post.likes = post.likes.filter((like) => like.user.toString() !== userId);

      post.likeCount -= 1;

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked",
        likeCount: post.likeCount,
      });
    } else {
      // ✅ Like
      post.likes.push({
        user: userId,
        username: req.user?.username || "User",
      });

      post.likeCount += 1;

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post liked",
        likeCount: post.likeCount,
      });
    }
  } catch (error) {
    console.log("Error in toggleLikePost:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;
    const { text } = req.body;

    // ✅ Validate input
    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    // ✅ Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // ✅ Add comment
    const newComment = {
      user: userId,
      username: req.user?.username || "User",
      text: text.trim(),
    };

    post.comments.push(newComment);

    // ✅ Update count
    post.commentCount += 1;

    // ✅ Save
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment added",
      comment: newComment,
      commentCount: post.commentCount,
    });
  } catch (error) {
    console.log("Error in createComment:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.log("Error in getAllPosts:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
