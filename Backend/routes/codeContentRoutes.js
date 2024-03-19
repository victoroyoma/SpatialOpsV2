const express = require("express");
const CodeContentController = require("../controllers/CodeContentController");
const router = express.Router();

router.get("/code-content", CodeContentController.fetchCodeContent);

module.exports = router;
