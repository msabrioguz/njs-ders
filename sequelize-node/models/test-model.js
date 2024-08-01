const db = require("../db/index");
const { DataTypes } = require("sequelize");

const TestModel = db.sequelize.define(
  "Test",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING({ length: 50 }),
      defaultValue: "Ali",
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
  },
  {
    createAt: true,
    updateAt: true,
    modelName: "TestModel",
    tableName: "test",
    timestaps: true,
    version: true,
  }
);

module.exports = TestModel;
