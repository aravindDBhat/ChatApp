const mongoose = require("mongoose");
const { userSchema } = require("./userModel");
const conversarionSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  conversationName: {
    type: String,
    required: false,
  },
  users: [userSchema],

  conversationType: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const Conversation = mongoose.model("Conversations", conversarionSchema);
module.exports = Conversation;
