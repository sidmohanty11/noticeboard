const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://www.cet.edu.in/notice.php";

const app = express();

let allNotice = [];

app.get("/", async (req, res) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const notice = $("tr td b").text();
  allNotice.push({ notice });
  res.send({ allNotice });
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
