const { DeviceLog } = require("../models");
const ErrorStackParser = require("error-stack-parser");
const { SourceMapConsumer } = require("source-map");

const createLog = async (req, res) => {
  try {
    const {
      errorMessage,
      stackTrace,
      fileName,
      lineNumber,
      columnNumber,
      errorTime,
    } = req.body;
    const parsedStack = ErrorStackParser.parse({ stack: stackTrace });
    const frame = parsedStack[0]; // Assuming we're only interested in the first frame

    const consumer = await new SourceMapConsumer(sourceMapFile);
    const originalPosition = consumer.originalPositionFor({
      line: frame.lineNumber,
      column: frame.columnNumber,
    });

    const githubUrl = `https://github.com/victoroyoma/SpatialOpsV2/tree/main/${originalPosition.source}#L${originalPosition.line}`;
    const newLog = await DeviceLog.create({
      errorMessage,
      stackTrace,
      fileName: originalPosition.source,
      lineNumber: originalPosition.line,
      columnNumber: originalPosition.column,
      errorTime,
      githubUrl,
    });
    consumer.destroy(); // Clean up the source map consumer
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const { fileName, sortOrder = "DESC" } = req.query;
    const whereCondition = fileName ? { fileName } : {}; // Filter condition

    const logs = await DeviceLog.findAll({
      where: whereCondition,
      order: [["errorTime", sortOrder.toUpperCase()]], // Sorting
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await DeviceLog.findByPk(id);
    if (log) {
      res.json(log);
    } else {
      res.status(404).json({ error: "Log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      errorMessage,
      stackTrace,
      fileName,
      lineNumber,
      columnNumber,
      errorTime,
    } = req.body;
    const log = await DeviceLog.findByPk(id);
    if (log) {
      await log.update({
        errorMessage,
        stackTrace,
        fileName,
        lineNumber,
        columnNumber,
        errorTime,
      });
      res.json(log);
    } else {
      res.status(404).json({ error: "Log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DeviceLog.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Log not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLog,
  getLogs,
  getLogById,
  updateLog,
  deleteLog,
};
