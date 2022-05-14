const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const webpush = require("web-push");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
webpush.setVapidDetails(
  "mailto: `sidmohanty11@gmail.com`",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const connectDB = require("./utils/connectDB");

const noticeRoutes = require("./routes/noticeRoutes");
const checkNotice = require("./utils/checkNotice");
const { default: axios } = require("axios");

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.post("/notifications/subscribe", (req, res) => {
  console.log(req.body);
  const payload = JSON.stringify({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  // console.log(req.body.subscription);
  webpush
    .sendNotification(req.body.subscription, payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

app.use("/api/notice", noticeRoutes);

cron.schedule("0 23 * * *", () => {
  // running every 23 hours to check if any new notice has arrived
  checkNotice();
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log(`DB Connected`)
    );
    app.listen(4000, () => {
      console.log("http://localhost:4000");
    });

    // run first on server start to store all the notices on the page
    checkNotice();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
