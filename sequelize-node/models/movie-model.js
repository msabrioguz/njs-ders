const db = require("../db");
const { DataTypes } = require("sequelize");

const Movie = db.sequelize.define("Movie", {
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

module.exports = Movie;
