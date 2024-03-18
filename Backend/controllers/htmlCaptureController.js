const { HtmlCapture } = require("../models");

exports.captureHtml = async (req, res) => {
  try {
    const capture = await HtmlCapture.create(req.body);
    res.status(201).send(capture);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getHtmlCaptures = async (req, res) => {
  try {
    const captures = await HtmlCapture.findAll();
    res.status(200).send(captures);
  } catch (error) {
    res.status(500).send(error);
  }
};
