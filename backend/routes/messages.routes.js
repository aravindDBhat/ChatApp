const express = require("express");
const router = express.Router();
const messageService = require("../services/message.service");

router.get("/", async (req, res) => {
  try {
    const { conversationId } = req.query;
    const allMessage = await messageService.getMessagesByConversationId(
      conversationId
    );

    res.json({
      statusCode: 200,
      data: allMessage,
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
    const data = req.body;
    console.log(data);

    const newMessage = await messageService.AddMsg(data);
    res.json({
      statusCode: 200,
      data: newMessage,
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
module.exports = router;
