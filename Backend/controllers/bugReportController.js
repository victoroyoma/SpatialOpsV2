const { BugReport } = require("../models");

exports.createBugReport = async (req, res) => {
  try {
    const { errorMessage, fileName, lineNumber } = req.body;
    const newBugReport = await BugReport.create({
      errorMessage,
      fileName,
      lineNumber,
      createdAt: new Date(),
    });
    res.status(201).json(newBugReport);
  } catch (error) {
    console.error("Error creating bug report:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBugReports = async (req, res) => {
  try {
    const bugReports = await BugReport.findAll();
    res.json(bugReports);
  } catch (error) {
    console.error("Error fetching bug reports:", error);
    res.status(500).send("Internal Server Error");
  }
};
