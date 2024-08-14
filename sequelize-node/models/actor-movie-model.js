const db = require("../db");
const { DataTypes } = require("sequelize");

const Actor_Movie = db.sequelize.define("Actor_Movie", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
});

module.exports = Actor_Movie;
