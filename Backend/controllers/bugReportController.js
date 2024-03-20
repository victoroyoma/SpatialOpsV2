const BugReport = require("../models/BugReport");

const getAllBugReports = async (req, res) => {
  try {
    const bugReports = await BugReport.findAll();
    return res.status(200).json({
      success: true,
      count: bugReports.length,
      data: bugReports,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bug reports",
      error: error.message,
    });
  }
};

const createBugReport = async (req, res) => {
  const { errorMessage, component, lineNumber, occurredAt } = req.body;

  if (!errorMessage || !component || !lineNumber || !occurredAt) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: errorMessage, component, lineNumber, occurredAt",
    });
  }

  try {
    const bugReport = await BugReport.create({
      errorMessage,
      component,
      lineNumber,
      occurredAt,
    });
    return res.status(201).json({
      success: true,
      message: "Bug report created successfully",
      data: bugReport,
    });
  } catch (error) {
    console.error("Creation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create bug report",
      error: error.message,
    });
  }
};

module.exports = { createBugReport, getAllBugReports };
