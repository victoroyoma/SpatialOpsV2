const BugReport = require("../models/BugReport");

// Fetch all bug reports
exports.getAllBugReports = async (req, res) => {
  try {
    const bugReports = await BugReport.findAll();
    res.json({ success: true, data: bugReports });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bug reports",
      error: error.message,
    });
  }
};

exports.createBugReport = async (req, res) => {
  // try {
  //   const bugReport = await BugReport.create(req.body);
  //   res.status(201).json({ success: true, data: bugReport });
  // } catch (error) {
  //   console.error("Creation Error:", error);
  //   res.status(500).json({
  //     success: false,
  //     message: "Failed to create bug report",
  //     error: error.message,
  //   });
  // }
};
