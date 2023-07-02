const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userService = require("../services/users.service");

router.get("/", async function (req, res) {
  try {
    const allUsers = await userService.getAllUsers();
    res.json({
      statusCode: 200,
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

router.post("/", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    // validate users payload
    userService.validateUserPayload({
      name,
      password,
      email,
      res,
    });
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        statusCode: 409,
        error: `A user with email: ${email} alreay exist`,
      });
    }
    const newUser = await userService.createNewUser({
      name,
      email,
      password,
    });
    return res.json({
      statusCode: 200,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.json({
      statusCode: 500,
      error: error.message,
    });
  }
});

module.exports = router;
