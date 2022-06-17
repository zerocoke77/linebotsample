const express = require("express");
const line = require("@line/bot-sdk");
const util = require("util");
const morgan = require("morgan");
require("dotenv").config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();
app.use(morgan("dev"));
const client = new line.Client(config);

app.post("/linewebhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/eswebhook", (req, res, next) => {
  console.log("req", Object.keys(req));
  console.log(
    util.inspect(req.body, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
  client.pushMessage("C04ebe16251810453bd89fb29f0979d8b", {
    type: "text",
    text: "message from es webhook",
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
  console.log("event", event);
  // return client.replyMessage(event.replyToken, {
  //   type: "text",
  //   text: event.message.text,
  // });
}

app.listen(3000, (err) => {
  console.log(`
  ################################################
  LineBot Server listening on port: 3000
  ################################################
`);
});
