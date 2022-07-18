const express = require("express");
const util = require("util");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/eswebhook", (req, res, next) => {
  console.log(
    util.inspect(req.body, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );

  // const text =
  //   title +
  //   "\n" +
  //   messages.reduce((acc, cur) => {
  //     return acc + "\n" + cur;
  //   });

  // client.pushMessage("C04ebe16251810453bd89fb29f0979d8b", {
  //   type: "text",
  //   text,
  // });
  // return;
});

app.listen(3000, (err) => {
  console.log(`
  ################################################
  LineBot Server listening on port: 3000
  ################################################
`);
});
