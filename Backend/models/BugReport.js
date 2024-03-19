"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BugReport extends Model {
    static associate(models) {
      // define association here
    }
  }
  BugReport.init(
    {
      errorMessage: DataTypes.TEXT,
      component: DataTypes.STRING,
      lineNumber: DataTypes.INTEGER,
      occurredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BugReport",
    }
  );
  return BugReport;
};
