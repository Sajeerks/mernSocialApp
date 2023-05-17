const express = require("express");
const {
  register,
  login,
  followUser,
  logout,
  updatePasword,
  updateProfile,
  deleteMyProfile,
  MyProfile,
  getAnyuserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMYposts,
  getUserPosts,
} = require("../contorllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const { deleteComment } = require("../contorllers/postController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);
router.route("/update/password").put(isAuthenticated, updatePasword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, MyProfile);
router.route("/user/:id").get(isAuthenticated, getAnyuserProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/my/posts").get(isAuthenticated, getMYposts);
router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

module.exports = router;
