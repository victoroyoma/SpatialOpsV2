module.exports = (sequelize, DataTypes) => {
  const BugReport = sequelize.define(
    "BugReport",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      errorMessage: DataTypes.TEXT,
      component: DataTypes.STRING,
      lineNumber: DataTypes.INTEGER,
      occurredAt: DataTypes.DATE,
    },
    {}
  );
  return BugReport;
};
