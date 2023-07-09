const Conversation = require("../models/conversationModel");
const userService = require("./users.service");
async function getUserByConversationId({ userId, type }) {
  const user = await userService.findUserByUsersIds([userId]);
  if (!user.length) {
    throw new Error(
      JSON.stringify({
        statusCode: 404,
        error: `User with userId ${userId} not found`,
      })
    );
  }
  return await Conversation.find({
    users: {
      $in: user,
    },
    ...(type ? { conversationType: type } : null),
  });
}

async function createNewConversation({
  users,
  conversationId,
  conversationName,
  conversationType,
  res,
}) {
  const existingConversaton = await Conversation.findOne({
    conversationId,
  });
  if (existingConversaton) {
    return res.status(400).json({
      statusCode: 400,
      error: `A conversation with ${conversationId} already exist`,
    });
  }
  const newConversation = new Conversation({
    conversationId,
    conversationName,
    conversationType,
    users,
    time: new Date(),
  });
  return await newConversation.save();
}
async function getConversationById(conversationId) {
  return await Conversation.findOne({
    conversationId,
  });
}
module.exports = {
  getUserByConversationId,
  createNewConversation,
  getConversationById,
};
