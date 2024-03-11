const { Task } = require("../models/index");

const getTasks = async (req, res) => {
  try {
    const { status, priority, assignee, component, milestone, sort, order } =
      req.query;
    let where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignee) where.assignee = assignee;
    if (component) where.component = component;
    if (milestone) where.milestone = milestone;

    let orderArray = [];
    if (sort && order) {
      const sorts = sort.split(",");
      const orders = order.split(",");
      sorts.forEach((sortField, index) => {
        orderArray.push([sortField, orders[index] || "ASC"]);
      });
    }

    const tasks = await Task.findAll({ where, order: orderArray });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
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
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
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
