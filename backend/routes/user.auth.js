const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userService = require("../services/users.service");
const authService = require("../services/auth.service");

//sign in....

router.post("/signin", async (req, res) => {
  try {
    const auth = authService.signIn({
      req,
      res,
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 401,
      error: error.message,
    });
  }
});

//sign up....

router.post("/signup", async function (req, res) {
  try {
    const auth = authService.signUp({ req, res });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

module.exports = router;
