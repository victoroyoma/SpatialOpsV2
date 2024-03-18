const express = require("express");
const router = express.Router();
const bugReportController = require("../controllers/bugReportController");

router.post("/bugReports", bugReportController.createBugReport);
router.get("/bugReports", bugReportController.getBugReports);

module.exports = router;
