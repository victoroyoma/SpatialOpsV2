const express = require("express");
const router = express.Router();
const BugReportController = require("../controllers/BugReportController");

router.post("/api/bug-report", BugReportController.createBugReport);
router.get("/api/bug-reports", BugReportController.getAllBugReports);

module.exports = router;
