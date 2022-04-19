const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

const host = "https://www.cet.edu.in/";
const url = "https://www.cet.edu.in/notice.php";

const app = express();
app.use(cors());

let datesAndNotice = [];
let urls = [];
let allNotice = [];

app.get("/", async (req, res) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  $("td[width=98%] div[class='gentxt'] b").each(function () {
    datesAndNotice.push($(this).text());
  });

  $("td[width=98%] div[class='gentxt'] a").each(function () {
    urls.push(host + $(this).attr("href"));
  });

  let i = 0,
    j = 1,
    counter = 0;

  while (counter < links.length) {
    const notice = {};

    notice["notice"] = datesAndNotice[i];
    notice["date"] = datesAndNotice[j];
    notice["url"] = links[counter];

    (i += 2), (j += 2), counter++;

    allNotice.push(notice);
  }

  res.send({ allNotice });
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
