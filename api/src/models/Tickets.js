const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "tickets",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      application: {
        type: DataTypes.STRING,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      steps: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
      },
      severity: {
        type: DataTypes.INTEGER,
      },
      nature: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      resolution: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};
