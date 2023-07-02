const Message = require("../models/textModel");
async function AddMsg(data) {
  const { conversationId, to, from, msg, time } = data;
  const newMessage = new Message({
    conversationId,
    to,
    from,
    msg,
    time,
  });
  console.log(newMessage);
  return newMessage.save();
}
async function getConversationById(conversationId, res) {
  return await Message.find({
    conversationId,
  });
}
module.exports = {
  AddMsg,
  getConversationById,
};
