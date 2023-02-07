import { Model, Sequelize } from "sequelize";
import { UserModel } from "../types";

interface IUserModel extends Model<UserModel>, UserModel {}

export const initUser = (sequelize: Sequelize, DataTypes: any) => {
  const attributes = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repeatPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  const options = {
    tableName: "users",
  };

  return sequelize.define<IUserModel>("User", attributes, options);
};
