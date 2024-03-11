// bugRoutes.js

const express = require("express");
const router = express.Router();
const bugController = require("../controllers/bugController");

router.post("/logs", bugController.createBugReport);

module.exports = router;
