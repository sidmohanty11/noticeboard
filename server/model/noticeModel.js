const mongoose = require("mongoose");

const NoticeSchema = mongoose.Schema({
  notice: String,
  date: String,
  url: String,
  isNewNotice: Boolean,
});

module.exports = mongoose.model("notice", NoticeSchema);
