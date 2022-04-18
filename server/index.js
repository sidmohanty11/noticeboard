const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://cet.edu.in/view_notice_details.php?recid=622";

const app = express();

let allNotice = [];

app.get("/", async (req, res) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const noticeDate = $("td[width=97%]").text();
  const noticeDetail = $("td[align=justify]").text();
  const noticeLink = url;

  console.log({ noticeDate, noticeDetail, url: noticeLink });

  res.send("HII");
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
