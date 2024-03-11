module.exports = (sequelize, DataTypes) => {
  const BugReport = sequelize.define("BugReport", {
    errorMessage: DataTypes.TEXT,
    fileName: DataTypes.STRING,
    lineNumber: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  });
  return BugReport;
};
