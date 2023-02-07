import sequelize from "../configDB";
import { DataTypes } from "sequelize";
import { initUser } from "./userModel";

export const User = initUser(sequelize, DataTypes);
