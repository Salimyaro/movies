import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false
  }
);
