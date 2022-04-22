const express = require("express");
const router = express.Router();
const webpush = require("web-push");

router.post("/notifications/subscribe", (req, res) => {
  const subscription = req.body;

  const payload = JSON.stringify({
    title: "Hello!",
    body: "It works.",
  });

  webpush
    .sendNotification(subscription, payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

module.exports = router;
