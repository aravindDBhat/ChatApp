const User = require("../models/userModel");
function validateUserPayload({ name, email, password, res }) {
  if (!name)
    return res.status(400).json({
      statusCode: 400,
      error: "Name is requird",
    });
  if (!email) {
    return res.status(400).json({
      statusCode: 400,
      error: "Email is requird",
    });
  }
  if (!password) {
    return res.status(400).json({
      statusCode: 400,
      error: "Password is requird",
    });
  }
}

async function findUserByEmail(email) {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
}

async function createNewUser(userData) {
  const { name, email, password } = userData;
  const newUser = new User({
    name,
    email,
    password,
  });
  return await newUser.save();
}

module.exports = {
  validateUserPayload,
  findUserByEmail,
  createNewUser,
};
