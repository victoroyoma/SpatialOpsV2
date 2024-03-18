// module.exports = (sequelize, DataTypes) => {
//   const DeviceLog = sequelize.define(
//     "DeviceLog",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       time: DataTypes.DATE,
//       deviceId: DataTypes.STRING,
//       userId: DataTypes.INTEGER,
//       logDetails: DataTypes.TEXT,
//     },
//     {}
//   );
//   DeviceLog.associate = function (models) {
//     // associations can be defined here
//     DeviceLog.belongsTo(models.User, { foreignKey: "userId" });
//   };
//   return DeviceLog;
// };
