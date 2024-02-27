const express = require("express");
const router = express.Router();
const DeviceLogController = require("../controllers/DeviceLogController");
router.post("/", DeviceLogController.createLog);
router.get("/", DeviceLogController.getLogs);
router.get("/:id", DeviceLogController.getLogById);
router.put("/:id", DeviceLogController.updateLog);
router.delete("/:id", DeviceLogController.deleteLog);

module.exports = router;
