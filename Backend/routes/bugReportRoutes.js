const express = require("express");
const router = express.Router();
const BugReportController = require("../controllers/BugReportController");

router.get("/bug-reports", BugReportController.getAllBugReports);
router.post("/bug-reports", BugReportController.createBugReport);

module.exports = router;
