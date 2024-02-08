const { Task } = require("../models/index");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getTaskById = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const task = await Task.findByPk(ticketID);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { ticketID: ticketID },
    });

    if (updated) {
      const updatedTask = await Task.findOne({ where: { ticketID: ticketID } });
      res.status(200).json(updatedTask);
    } else {
      throw new Error("Task not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { ticketID } = req.params;
    const deleted = await Task.destroy({
      where: { ticketID: ticketID },
    });

    if (deleted) {
      res.status(204).send("Task deleted");
    } else {
      throw new Error("Task not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
