require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const devGalleryRoutes = require("./routes/devGalleryRoutes");
const messagingRoutes = require("./routes/messagingRoutes");
const deviceLogRoutes = require("./routes/deviceLogRoutes");
const htmlCaptureRoutes = require("./routes/htmlCaptureRoutes");
// const bugReportRoutes = require("./routes/bugReportRoutes");
const codeContentRoutes = require("./routes/codeContentRoutes");

const { sequelize } = require("./models/index");
const BugReport = require("./models/BugReport");

const app = express();

const corsOptions = {
  origin: "https://spatial-ops-v2.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to log requests for debugging purposes
app.use((req, res, next) => {
  console.log(
    `${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`
  );
  next();
});

const routeSetup = [
  { path: "/api/users", handler: userRoutes },
  { path: "/api/dev-gallery", handler: devGalleryRoutes },
  {
    path: "/api/uploads",
    handler: express.static(path.join(__dirname, "uploads")),
  },
  { path: "/api/tasks", handler: taskRoutes },
  { path: "/api/messages", handler: messagingRoutes },
  { path: "/api/deviceLogs", handler: deviceLogRoutes },
  { path: "/api/htmlCaptures", handler: htmlCaptureRoutes },
  // { path: "/api/bug-report", handler: bugReportRoutes },
  { path: "/api/code-content", handler: codeContentRoutes },
];

routeSetup.forEach((route) => {
  app.use(route.path, route.handler);
});

app.post("/api/report-bug", async (req, res) => {
  try {
    const bugReport = await BugReport.create(req.body);
    res.status(201).json({ success: true, data: bugReport });
  } catch (error) {
    console.error("Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create bug report",
      error: error.message,
    });
  }
});

app.get("/api/reported-bugs", async (req, res) => {
  try {
    const bugReports = await BugReport.findAll();
    res.json({ success: true, data: bugReports });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bug reports",
      error: error.message,
    });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Endpoint not found.");
});

//sync({ force: true }) for Clearing and Creating DB
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
