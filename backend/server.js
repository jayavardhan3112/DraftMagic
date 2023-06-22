const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const app = express();
const port = 3001;
require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const MAX_WORDS_LIMIT = 500;
const openai = new OpenAIApi(configuration);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// app.use(express.static("public"));
app.use(bodyParser.json());

// Example route to handle message drafting
app.post("/api/draftMessage", async (req, res) => {
  const {
    recipient,
    subject,
    body,
    designation,
    numWords = 200,
    messageType,
  } = req.body;
  console.log(req.body);
  try {
    if (numWords > MAX_WORDS_LIMIT) {
      return res
        .status(400)
        .json({ error: `Word count exceeds the limit of ${MAX_WORDS_LIMIT}` });
    }
    let prompt;
    if (messageType === "normal") {
      prompt = `You are ${designation}. Write a slack message with emojis if required to ${recipient}:\n\nBody: ${body}\n\n`;
    } else if (messageType === "email") {
      prompt = `You are ${designation}. Compose an email to ${recipient} with the subject "${subject}":\n\nnBody: ${body}\n\n`;
    } else {
      return res.status(400).json({ error: "Invalid message type" });
    }
    // Make a request to the ChatGPT API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.1,
      presence_penalty: 0.0,
    });
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt:
    //     "Convert my short hand into a first-hand account of the meeting:\n\nTom: Profits up 50%\nJane: New servers are online\nKjel: Need more time to fix software\nJane: Happy to help\nParkman: Beta testing almost done",
    //   temperature: 0,
    //   max_tokens: 64,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    // });

    const { choices } = response.data;
    const draftMessage = choices[0].text.trim();

    res.json({ draftMessage });
  } catch (error) {
    console.error("Error generating draft message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the draft message" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
