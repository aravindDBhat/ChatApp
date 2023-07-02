const express = require("express");
const app = express();
const router = express.Router();
const textService = require("../services/text.service");

router.get("/text", async (req, res) => {
  try {
    const { userId } = req.query;
    const allMessage = await textService.getConversationById({
      userId,
    });

    res.json({
      statusCode: 200,
      data: allMessage,
    });
  } catch (err) {
    console.error(err);
    res.json({
      statusCode: 500,
      error: err.message,
    });
  }
});

router.post("/text", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const newMessage = await textService.AddMsg(data);
    res.json({
      statusCode: 200,
      data: newMessage,
    });
  } catch (error) {
    return res.json({
      statuscode: 500,
      message: error.message,
    });
  }
});
module.exports = router;
