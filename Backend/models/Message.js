// models/Message.js
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        // Sender
        type: DataTypes.UUID,
        allowNull: false,
      },
      threadId: {
        // Nullable for direct messages
        type: DataTypes.UUID,
        allowNull: true,
      },
      recipientId: {
        // Nullable for thread messages
        type: DataTypes.UUID,
        allowNull: true,
      },
      isDirect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Message;
};
