const express = require("express");
const app = express();
const router = express.Router();
const textService = require("../services/text.service");

router.get("/text", async (req, res) => {
  try {
    const { conversationId } = req.body;
    console.log("data is : ", req.body);
    const allmsg = await textService.AddMsg(req.body);
    const allMessage = await textService.getConversationById(
      conversationId,
      res
    );
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

    const allmsg = await textService.AddMsg(data);
    const messages = await textService.getConversationById(
      data.conversationId,
      res
    );
    res.json({
      msgs: "",
    });
  } catch (error) {
    return res.json({
      statuscode: 500,
      message: error.message,
    });
  }
});
module.exports = router;
