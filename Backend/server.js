require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const devGalleryRoutes = require("./routes/devGalleryRoutes");
const messagingRoutes = require("./routes/messagingRoutes");
const deviceLogRoutes = require("./routes/deviceLogRoutes");
const htmlCaptureRoutes = require("./routes/htmlCaptureRoutes");
const bugReportRoutes = require("./routes/bugReportRoutes");
const codeContentRoutes = require("./routes/codeContentRoutes");

const { sequelize } = require("./models/index");

const app = express();

// Define CORS options
const corsOptions = {
  origin: "https://spatial-ops-v2.vercel.app",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());

// Setup routes
app.use("/api", userRoutes);
app.use("/api/dev-gallery", devGalleryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/tasks", taskRoutes);
app.use("/api", messagingRoutes);
app.use("/api/deviceLogs", deviceLogRoutes);
app.use("/api/htmlCaptures", htmlCaptureRoutes);
app.use("/api", bugReportRoutes);
app.use("/api", codeContentRoutes);

//sync({ force: true }) for Clearing and Creating DB
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
