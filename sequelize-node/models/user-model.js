const db = require("../db");
const { DataTypes } = require("sequelize");

const User = db.sequelize.define("User", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING({ length: 50 }),
  },
});

module.exports = User;
