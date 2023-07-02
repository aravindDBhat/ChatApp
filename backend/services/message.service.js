const { Message } = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const { User } = require("../models/userModel");
async function AddMsg(data) {
  const { conversationId, user, text } = data;
  const [conversation] = await Conversation.find({
    conversationId
  })

  if (!conversation) {
    throw new Error(JSON.stringify({
      statusCode: 404,
      error: `Conversation with conversationId ${conversationId} not found`
    }))
  }

  const [existingUser] = await User.find({
    _id: user
  })

  if (!existingUser) {
    throw new Error(JSON.stringify({
      statusCode: 404,
      error: `User  with useId ${user} not found`
    }))
  }

  const newMessage = new Message({
    conversationId,
    time: new Date(),
    text,
    user: existingUser
  });
  console.log(newMessage);
  return await newMessage.save();
}

async function getConversationById(conversationId, res) {
  return await Message.find({
    conversationId,
  });
}

async function getMessagesByConversationId(conversationId) {
  const [conversation] = await Conversation.find({
    conversationId
  })
  if (!conversation) {
    throw new Error(JSON.stringify({
      statusCode: 404,
      error: `Conversation with conversationId ${conversationId} not found`
    }))
  }
  return await Message.find({
    conversationId
  })
}
module.exports = {
  AddMsg,
  getConversationById,
  getMessagesByConversationId
};
