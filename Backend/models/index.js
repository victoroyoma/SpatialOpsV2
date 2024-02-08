const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Message = require("./Message")(sequelize, Sequelize.DataTypes);
const Thread = require("./Thread")(sequelize, Sequelize.DataTypes);
const Task = require("./task")(sequelize, Sequelize.DataTypes);
const DevGalleryItem = require("./DevGalleryItem")(
  sequelize,
  Sequelize.DataTypes
);

// Users can create many messages
User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { as: "Sender", foreignKey: "userId" });

// A thread can have many messages
Thread.hasMany(Message, { foreignKey: "threadId" });
Message.belongsTo(Thread, { foreignKey: "threadId" });

// Users can also create threads
User.hasMany(Thread, { foreignKey: "creatorId" });
Thread.belongsTo(User, { as: "Creator", foreignKey: "creatorId" });

// Optional: Association for the recipient
User.hasMany(Message, { foreignKey: "recipientId" });
Message.belongsTo(User, { as: "Recipient", foreignKey: "recipientId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Message,
  Task,
  DevGalleryItem,
  Thread,
};
