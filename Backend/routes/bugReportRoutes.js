const express = require("express");
const router = express.Router();
const BugReportController = require("../controllers/BugReportController");

router.post("/api/report-bug", BugReportController.createBugReport);
router.get("/api/reported-bugs", BugReportController.getAllBugReports);

module.exports = router;
