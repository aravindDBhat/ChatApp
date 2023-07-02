const mongoose = require("mongoose");
const { userSchema } = require('./userModel')
const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  user: userSchema,
  text: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const Message = mongoose.model("Messages", messageSchema);
module.exports = { Message, messageSchema };
