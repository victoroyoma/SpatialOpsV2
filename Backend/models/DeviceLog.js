module.exports = (sequelize, DataTypes) => {
  const DeviceLog = sequelize.define("DeviceLog", {
    errorMessage: DataTypes.TEXT,
    stackTrace: DataTypes.TEXT,
    fileName: DataTypes.STRING,
    lineNumber: DataTypes.INTEGER,
    columnNumber: DataTypes.INTEGER,
    errorTime: DataTypes.DATE,
    githubUrl: DataTypes.STRING, // URL to the source code on GitHub
  });
  return DeviceLog;
};
