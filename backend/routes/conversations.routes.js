const express = require("express");
const router = express.Router();
const coversationService = require("../services/conversation.service");
const userService = require("../services/users.service");

router.get("/", async (req, res, next) => {
  try {
    const { userId, type } = req.query;

    const conversations = await coversationService.getUserByConversationId({
      userId,
      type,
    });

    res.json({
      statusCode: 200,
      data: conversations,
    });
  } catch (err) {
    console.error(err);
    let errorData;
    try {
      errorData = JSON.parse(err.message);
    } catch (e) {}
    res.status(errorData?.statusCode || 500).json({
      statusCode: errorData?.statusCode || 500,
      error: errorData?.error || err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { users, conversationId, conversationName, conversationType } =
      req.body;
    const requiredFields = ["users", "conversationId", "conversationType"];
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        res.json({
          statusCode: 400,
          error: `${field} is required`,
        });
      }
    });
    const conversationUsers = await userService.findUserByUsersIds(users);
    const newConversation = await coversationService.createNewConversation({
      users: conversationUsers,
      conversationId,
      conversationName,
      conversationType,
      res,
    });
    res.json({
      statusCode: 200,
      data: newConversation,
    });
  } catch (error) {}
});

router.get("/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await coversationService.getConversationById(
      conversationId
    );
    if (!conversation) {
      return res.status(404).json({
        statusCode: 404,
        error: `ConversationId not found`,
      });
    }

    res.json({
      statusCode: 200,
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      error: error.message,
    });
  }
});
module.exports = router;
