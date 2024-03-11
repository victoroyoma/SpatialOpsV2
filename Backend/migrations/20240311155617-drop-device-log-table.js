"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DeviceLogs");
  },

  down: async (queryInterface, Sequelize) => {
    // Here, you would ideally re-create the table structure. This is omitted for brevity.
  },
};
