import { Model, Sequelize } from "sequelize";
import { MapModel } from "../types";

interface IMapModel extends Model<MapModel>, MapModel {}

export const initMap = (sequelize: Sequelize, DataTypes: any) => {
  const attributes = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    mapName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    tableName: "maps",
  };

  return sequelize.define<IMapModel>("Map", attributes, options);
};
