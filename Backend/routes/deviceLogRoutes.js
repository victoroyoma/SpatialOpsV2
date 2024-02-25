const express = require("express");
const router = express.Router();
const DeviceLogController = require("../controllers/DeviceLogController");

router.post("/logs", DeviceLogController.createLog);

router.get("/logs", DeviceLogController.getLogs);

router.get("/logs/:id", DeviceLogController.getLogById);

router.put("/logs/:id", DeviceLogController.updateLog);

router.delete("/logs/:id", DeviceLogController.deleteLog);

module.exports = router;
