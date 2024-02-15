"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "priority", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Pri0",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "priority");
  },
};
