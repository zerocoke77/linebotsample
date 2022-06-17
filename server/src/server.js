const express = require("express");
const line = require("@line/bot-sdk");
require("dotenv").config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();
const client = new line.Client(config);

app.post("/linewebhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

app.post("/eswebhook", (req, res, next) => {
  client
    .broadcast("eswebhook")
    .then((result) => {
      console.log("result!!", result);
    })
    .catch((err) => {
      console.log("errorr!", err);
    });
});

app.get("/test", (req, res, next) => {
  console.log("test");
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  console.log("event.message.text", event.message.text);
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
}

app.listen(3000, (err) => {
  console.log(`
  ################################################
  LineBot Server listening on port: 3000
  ################################################
`);
});
