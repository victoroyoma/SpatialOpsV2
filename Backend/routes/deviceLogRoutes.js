const express = require("express");
const router = express.Router();
const deviceLogController = require("../controllers/DeviceLogController");

router.post("/deviceLogs", deviceLogController.createDeviceLog);
router.get("/deviceLogs", deviceLogController.getDeviceLogs);

module.exports = router;
