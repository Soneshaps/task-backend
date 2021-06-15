const express = require("express");

const router = express.Router();
const {
  createUser,
  getUser,
  loginUser,
} = require("../controller/user.controller");
const {
  generateHash,
  generateToken,
  validatePassword,
  validateToken,
} = require("../middleware/user.middleware");

router.get("/", validateToken, loginUser);

router.post("/register", generateHash, createUser);

router.post("/login", getUser, validatePassword, generateToken, loginUser);

module.exports = router;
