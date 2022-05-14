const express = require("express");
const router = express.Router();

const {
  getAllNotice,
  getNewNotice,
} = require("../controllers/noticeController");

// get all notice
router.get("/all", getAllNotice);

// get new notice
router.get("/new", getNewNotice);

module.exports = router;
