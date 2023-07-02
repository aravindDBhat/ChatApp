const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const Message = mongoose.model("Messages", messageSchema);
module.exports = Message;
