import { Model, Sequelize } from "sequelize";
import { CharacterModel } from "../types";

interface ICharacterModel extends Model<CharacterModel>, CharacterModel {}

export const initCharacter = (sequelize: Sequelize, DataTypes: any) => {
  const attributes = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const options = {
    tableName: "charaters",
  };

  return sequelize.define<ICharacterModel>("Character", attributes, options);
};
