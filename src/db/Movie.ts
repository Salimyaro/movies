import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export class Movie extends Model {}
Movie.init(
  {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    year: {
      type: DataTypes.NUMBER
    },
    format: {
      type: DataTypes.ENUM("VHS", "DVD", "Blu-ray")
    }
  },
  {
    sequelize,
    modelName: "movie"
  }
);

export class Actor extends Model {}
Actor.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  },
  {
    sequelize,
    modelName: "actor"
  }
);

Movie.belongsToMany(Actor, { through: "movie-actors" });
Actor.belongsToMany(Movie, { through: "movie-actors" });
