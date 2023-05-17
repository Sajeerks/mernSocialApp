const express  = require("express")
const { createPost, likeAndUnlikePost, deletePost, getPostsOfFollowing, updateCaption, addComment, deleteComment } = require("../contorllers/postController.js")
const { isAuthenticated } = require("../middleware/auth.js")

const router = express.Router()

router.route("/post/upload").post(isAuthenticated,createPost)
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost).put(isAuthenticated,updateCaption).delete(isAuthenticated, deletePost)



router.route("/posts").get(isAuthenticated,getPostsOfFollowing)
router.route("/post/comment/:id").put(isAuthenticated,addComment).delete(isAuthenticated, deleteComment)




module.exports = router