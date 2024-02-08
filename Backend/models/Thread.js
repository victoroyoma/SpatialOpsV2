module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define("Thread", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Thread;
};
