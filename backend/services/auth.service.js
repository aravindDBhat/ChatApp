const jwt = require("jsonwebtoken");
const userService = require("../services/users.service");

function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "30d",
  });
}

function validate({ user, password }) {
  return user.password == password;
}

async function signIn({ res, req }) {
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email);

  //   if user  doest not exist in db
  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      msg: "user does not exist. Please sign up",
    });
  }
  const isUserValid = validate({ user, password });

  //   if email and password doent match
  if (!isUserValid) {
    return res.status(401).json({
      statusCode: 401,
      msg: "user does not exist. Please sign up",
    });
  }
  const payload = {
    userId: user._id,
    email: user.email,
    name: user.name,
  };
  const jwt = generateJWT(payload);
  return res.json({
    statusCode: 200,
    data: {
      jwt,
      user: payload,
    },
  });
}

async function signUp({ req, res }) {
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
  const payload = {
    userId: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
  };
  const jwt = generateJWT(payload);
  return res.json({
    statusCode: 200,
    data: {
      data: newUser,
      jwt,
      user: payload,
    },
  });
}

module.exports = {
  generateJWT,
  signIn,
  signUp,
};
