const Message = require("../models/conversationModel");
async function getUserByConversationId(userId, res) {
  return await Message.find({
    userId,
  });
}
module.exports = getUserByConversationId;
