// bugController.js modification
const { Task, BugReport } = require("../models");
const html2canvas = require("html2canvas");

exports.fileBugReport = async (req, res) => {
  try {
    const { description } = req.body;
    const screenshotBase64 = await html2canvas(document.body).then((canvas) => {
      return canvas.toDataURL("image/png");
    });

    // Assuming BugReport model exists and is configured appropriately
    const bugReport = await BugReport.create({
      description,
      screenshot: screenshotBase64,
    });

    // Create a task for the bug report
    const task = await Task.create({
      title: "Bug Report: " + description.substring(0, 30),
      description:
        "Bug report filed. See details in BugReports table. ID: " +
        bugReport.id,
      status: "Open",
      priority: "High",
      // Additional fields like assignee, component, etc., can be added here
    });

    res
      .status(201)
      .json({ message: "Bug report and task created successfully", task });
  } catch (error) {
    console.error("Error filing bug report:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Ensure you have the html2canvas package installed on the server, which might not be straightforward since it's primarily a client-side library. This code is meant to illustrate the concept and would need adaptation for a server-side implementation.
