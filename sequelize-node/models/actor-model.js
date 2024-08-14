const db = require("../db");
const { DataTypes } = require("sequelize");

const Actor = db.sequelize.define("Actor", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING({ length: 50 }),
  },
});

module.exports = Actor;
