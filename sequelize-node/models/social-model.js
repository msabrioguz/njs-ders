const db = require("../db");
const { DataTypes } = require("sequelize");

const SocialMedia = db.sequelize.define("Social", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING({ length: 50 }),
    allowNull: false,
  },
}, { tableName: "SocialMedia"});

module.exports = SocialMedia;
