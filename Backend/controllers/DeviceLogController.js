const { DeviceLog } = require("../models");

exports.createLog = async (req, res) => {
  try {
    const log = await DeviceLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    console.error("Failed to create log:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await DeviceLog.findAll();
    res.json(logs);
  } catch (error) {
    console.error("Failed to fetch logs:", error);
    res.status(500).send("Internal Server Error");
  }
};
