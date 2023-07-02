const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const cors = require("cors");
const usersRoute = require("./routes/users.routes");
const userAuth = require("./routes/user.auth.js");
const usermsg = require("./routes/user.text.js");
const PORT = process.env.APP_PORT || 4000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
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

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join", () => {
    socket.join(123);
  });
  socket.on("msg", (data) => {
    socket.to(123).emit("receive", data);
  });
});

app.use("/api/users", usersRoute);
app.use("/api/auth", userAuth);
app.use("/api", usermsg);
console.log("hi");
httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = app;
