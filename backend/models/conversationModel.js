const mongoose = require("mongoose");

const conversarionSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
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
const Conversation = mongoose.model("Cessages", conversarionSchema);
module.exports = Conversation;
