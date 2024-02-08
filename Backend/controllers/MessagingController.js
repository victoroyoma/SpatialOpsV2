const { Message, Thread, User } = require("../models/index");
const { Op } = require("sequelize");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude sensitive information
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all threads
exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.findAll({
      include: [
        {
          model: User,
          as: "Creator", // Assuming 'Creator' alias is set in the association
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages by thread ID
exports.getMessagesByThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const messages = await Message.findAll({
      where: { threadId, isDirect: false },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new thread
exports.createThread = async (req, res) => {
  try {
    const { name, creatorId } = req.body;
    const newThread = await Thread.create({ name, creatorId });
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a message (either in a thread or a direct message)
exports.sendMessage = async (req, res) => {
  try {
    const { text, userId, threadId, recipientId, isDirect } = req.body;
    const newMessage = await Message.create({
      text,
      userId,
      threadId: isDirect ? null : threadId,
      recipientId: isDirect ? recipientId : null,
      isDirect,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get direct messages between two users
exports.getDirectMessages = async (req, res) => {
  try {
    const { userId, recipientId } = req.params;
    const messages = await Message.findAll({
      where: {
        isDirect: true,
        [Op.or]: [
          { userId, recipientId },
          { userId: recipientId, recipientId: userId },
        ],
      },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a message
exports.editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.text = text;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const deletedCount = await Message.destroy({
      where: { id: messageId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
