const { BugReport } = require("../models");

exports.createBugReport = async (req, res) => {
  try {
    const { errorMessage, component, lineNumber, occurredAt } = req.body;
    const bugReport = await BugReport.create({
      errorMessage,
      component,
      lineNumber,
      occurredAt,
    });
    res.status(201).send(bugReport);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getBugReports = async (req, res) => {
  try {
    const bugReports = await BugReport.findAll();
    res.status(200).send(bugReports);
  } catch (error) {
    res.status(500).send(error);
  }
};
