const { DeviceLog, User } = require("../models");

exports.createDeviceLog = async (req, res) => {
  try {
    const log = await DeviceLog.create(req.body);
    res.status(201).send(log);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getDeviceLogs = async (req, res) => {
  try {
    const logs = await DeviceLog.findAll({
      include: [{ model: User }],
    });
    res.status(200).send(logs);
  } catch (error) {
    res.status(500).send(error);
  }
};
