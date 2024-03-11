const express = require("express");
const router = express.Router();
const bugReportController = require("../controllers/bugReportController");

router.post("/bug-reports", bugReportController.createBugReport);
router.get("/bug-reports", bugReportController.getBugReports);

module.exports = router;
