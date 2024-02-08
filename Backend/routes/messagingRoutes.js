const express = require("express");
const router = express.Router();
const messagingController = require("../controllers/MessagingController");

router.get("/users", messagingController.getUsers);
router.get("/threads", messagingController.getThreads);
router.get(
  "/threads/:threadId/messages",
  messagingController.getMessagesByThread
);
router.post("/threads", messagingController.createThread);
router.post("/messages", messagingController.sendMessage);
router.get(
  "/direct-messages/:senderId/:recipientId",
  messagingController.getDirectMessages
);
router.put("/messages/:messageId", messagingController.editMessage);
router.delete("/messages/:messageId", messagingController.deleteMessage);

module.exports = router;
