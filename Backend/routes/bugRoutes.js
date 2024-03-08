// In your taskRoutes.js or a new bugRoutes.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Add the new bug report endpoint
router.post("/report-bug", taskController.createBugReport);

module.exports = router;
