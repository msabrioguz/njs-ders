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
      get() {
        const value = this.getDataValue("name");
        console.log("Getter çalışıyor.");
        return value.toUpperCase();
      },
      set(value) {
        console.log("Setter çalışıyor...");
        this.setDataValue("name", value.toUpperCase());
      },
    },
    lastName: {
      type: DataTypes.STRING({ length: 50 }),
      defaultValue: "Veli",
    },
    eMail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Lütfen geçerli bir email adresi giriniz.",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return this.getDataValue("name") + " " + this.getDataValue("lastName");
      },
    },
  },
  {
    version: true,
    hooks: {
      beforeValidate: (model) => {
        console.log("BeforeValidate", model);
      },
    },
  }
);

TestModel.addHook("afterCreate", (model) => {
  console.log("afterCreate:", model);
});

module.exports = TestModel;
