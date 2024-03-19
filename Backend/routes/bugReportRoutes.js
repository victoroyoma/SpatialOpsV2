const express = require("express");
const router = express.Router();
const BugReportController = require("../controllers/bugReportController");

router.get("/", BugReportController.getAllBugReports);
router.post("/", BugReportController.createBugReport);

module.exports = router;
