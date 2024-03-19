const BugReport = require("../models/BugReport");

// Fetch all bug reports
exports.getAllBugReports = async (req, res) => {
  try {
    const bugReports = await BugReport.findAll();
    res.json(bugReports);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new bug report
exports.createBugReport = async (req, res) => {
  try {
    const bugReport = await BugReport.create(req.body);
    res.status(201).json(bugReport);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
