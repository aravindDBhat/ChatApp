const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const usersRoute = require("./routes/users.routes");
const userAuth = require("./routes/user.auth");
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/users", usersRoute);
app.use("/api/auth", userAuth);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
