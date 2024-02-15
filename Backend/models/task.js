module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      ticketID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      component: DataTypes.STRING,
      assignee: DataTypes.STRING,
      milestone: DataTypes.STRING,
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pri0",
      },
      description: DataTypes.TEXT,
      comments: DataTypes.TEXT,
    },
    {}
  );

  return Task;
};
