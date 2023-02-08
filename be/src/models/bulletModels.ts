import { Model, Sequelize } from "sequelize";
import { BulletModel } from "../types";

interface IBulletModel extends Model<BulletModel>, BulletModel {}

export const initBullet = (sequelize: Sequelize, DataTypes: any) => {
  const attributes = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    bulletName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    tableName: "bullets",
  };

  return sequelize.define<IBulletModel>("Bullet", attributes, options);
};
