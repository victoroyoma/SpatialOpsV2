module.exports = (sequelize, DataTypes) => {
  const DevGalleryItem = sequelize.define("DevGalleryItem", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return DevGalleryItem;
};
