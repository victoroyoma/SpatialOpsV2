const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
// const authenticate = require("../middleware/authenticate");

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:ticketID", taskController.updateTask);
router.delete("/:ticketID", taskController.deleteTask);
router.get("/:ticketID", taskController.getTaskById);

module.exports = router;
