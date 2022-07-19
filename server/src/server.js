const express = require("express");
const util = require("util");
const morgan = require("morgan");
const axios = require("axios");
require("dotenv").config();

const axiosInstance = axios.create();

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/eswebhook", async (req, res, next) => {
  console.log(
    util.inspect(req.body, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );

  await axiosInstance.post(
    "https://notify-api.line.me/api/notify",
    {
      message: JSON.stringify(req.body),
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );

  return res.status(200).end();
});

app.listen(3000, (err) => {
  console.log(`
  ################################################
  LineBot Server listening on port: 3000
  ################################################
`);
});
