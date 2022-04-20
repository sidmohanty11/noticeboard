const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(cors());

const connectDB = require("./utils/connectDB");

const noticeRoutes = require("./routes/noticeRoutes");
const checkNotice = require("./utils/checkNotice");

app.get("/", (req, res) => {
  res.send({ status: "ok" });
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
