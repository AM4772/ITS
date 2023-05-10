const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "resolutions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      timestamps: true,
    }
  );
};
