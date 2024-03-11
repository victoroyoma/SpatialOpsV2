// bugRoutes.js

const express = require("express");
const router = express.Router();
const bugController = require("../controllers/bugController");

router.post("/bug-reports", bugController.createBugReport);

module.exports = router;
