const express = require("express");
const router = express.Router();
const htmlCaptureController = require("../controllers/htmlCaptureController");

router.post("/htmlCaptures", htmlCaptureController.captureHtml);
router.get("/htmlCaptures", htmlCaptureController.getHtmlCaptures);

module.exports = router;
