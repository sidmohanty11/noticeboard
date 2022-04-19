const Notice = require("../model/noticeModel");

const getNewNotice = async (req, res) => {
  try {
    const _notice = await Notice.find({ isNewNotice: true });

    res.status(200).json({ message: "success", length: _notice.length, data: _notice });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "fail", data: [] });
  }
};

const getAllNotice = async (req, res) => {
  try {
    const _notices = await Notice.find({});

    res.status(200).json({ message: "success", length: _notices.length, data: _notices });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "fail", data: [] });
  }
};

module.exports = {
  getAllNotice,
  getNewNotice,
};
