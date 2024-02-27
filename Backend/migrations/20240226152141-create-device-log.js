"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DeviceLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      errorMessage: {
        type: Sequelize.TEXT,
      },
      stackTrace: {
        type: Sequelize.TEXT,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      lineNumber: {
        type: Sequelize.INTEGER,
      },
      columnNumber: {
        type: Sequelize.INTEGER,
      },
      errorTime: {
        type: Sequelize.DATE,
      },
      githubUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DeviceLogs");
  },
};
