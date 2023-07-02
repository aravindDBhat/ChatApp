const express = require("express");
const app = express();
const router = express.Router();
const coversationService = require("../services/conversation.service");

router.get("/conversation", async (req, res) => {
  try {
    const { userId } = req.query;
    const allMessage = await coversationService.getUserByConversationId({
      userId,
    });

    res.json({
      statusCode: 200,
      data: allMessage.coversationId,
    });
  } catch (err) {
    console.error(err);
    res.json({
      statusCode: 500,
      error: err.message,
    });
  }
});
module.exports = router;
