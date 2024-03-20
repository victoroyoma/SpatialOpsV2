const express = require("express");
const router = express.Router();
const BugReportController = require("../controllers/BugReportController");

router.get("/api/bug-reports", BugReportController.getAllBugReports);
router.post("/api/bug-report", BugReportController.createBugReport);

module.exports = router;
