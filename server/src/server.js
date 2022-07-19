const express = require("express");
const util = require("util");
const morgan = require("morgan");
const axios = require("axios");
const FormData = require("form-data");
const qs = require("querystring");
require("dotenv").config();

axios.defaults.baseURL = "https://notify-api.line.me/api/notify";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.ACCESS_TOKEN}`;
const axiosInstance = axios.create();

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/eswebhook", async (req, res, next) => {
  const { ctx } = req.body;

  // console.log(
  //   util.inspect(req.body, {
  //     showHidden: false,
  //     depth: null,
  //     colors: true,
  //   })
  // );

  const data = {
    message: "hihi",
  };

  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axiosInstance.post("/", qs.stringify(data), options);
  } catch (e) {
    console.log(e);
  }

  return res.status(200).end();
});

app.listen(3000, (err) => {
  console.log(`
  ################################################
  LineBot Server listening on port: 3000
  ################################################
`);
});
