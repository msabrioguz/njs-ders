const db = require("../db/index");
const { DataTypes } = require("sequelize");

const User = db.sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
});

module.exports = User;