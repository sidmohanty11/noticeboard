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

  for (let i = 0; i < urls.length; i++) {
    let notice;
    if (i === 0) {
      notice = {
        notice: datesAndNotice[i + 1],
        date: datesAndNotice[i],
        url: urls[i],
      };
    } else {
      notice = {
        notice: datesAndNotice[2 * i - 1],
        date: datesAndNotice[2 * i],
        url: urls[i],
      };
    }
    allNotice.push(notice);
  }

  res.send({ allNotice });
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
