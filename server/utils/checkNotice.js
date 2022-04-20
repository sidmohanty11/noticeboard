const cheerio = require("cheerio");
const axios = require("axios");
const Notice = require("../model/noticeModel");

const checkNotice = async () => {
  const host = "https://www.cet.edu.in/";
  const url = "https://www.cet.edu.in/notice.php";

  let datesAndNotice = [];
  let urls = [];
  let allNotice = [];

  try {
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

    while (counter < urls.length) {
      const notice = {};

      notice["notice"] = datesAndNotice[j];
      notice["date"] = datesAndNotice[i];
      notice["url"] = urls[counter];

      (i += 2), (j += 2), counter++;

      allNotice.push(notice);
    }

    allNotice.map(async (item) => {
      const { url, notice, date } = item;

      const _notice = await Notice.findOne({ url });

      if (_notice)
        await Notice.findByIdAndUpdate(_notice._id, { isNewNotice: false });
      else {
        await Notice.create({
          notice: notice,
          date: date,
          url: url,
          isNewNotice: true,
        });
      }
    });

    (datesAndNotice = []), (urls = []), (allNotice = []);
  } catch (err) {
    console.log(err);
  }
};

module.exports = checkNotice;
