const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const cors = require("cors");
const usersRoute = require("./routes/users.routes");
const authRoute = require("./routes/auth.routes");
const messagesRoute = require("./routes/messages.routes");
const conversationsRoute = require("./routes/conversations.routes");
const PORT = process.env.PORT || process.env.APP_PORT;
const app = express();
const httpServer = createServer(app);
const messageService = require("./services/message.service");

const io = new Server(httpServer,{
  cors:{
    origin:"*"
      }
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

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL
  })
);
app.use(express.json);
app.get("/", (req, res) => {
  res.send("hello");
});
//middleware
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conversations", conversationsRoute);

io.on("connection", (socket) => {
  socket.on("joinChannel", ({ channelId }) => {
    console.log("Join: " + channelId);
    socket.join(channelId);
  });

  socket.on("newMessage", async ({ channelId, messageData }) => {
    // Handle the "newMessage" event
    console.log("New message received:", messageData);
    const newMessage = await messageService.AddMsg(messageData);
    // emit new message to clients
    socket.in(channelId).emit("newMessage", newMessage);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

module.exports = { app };
