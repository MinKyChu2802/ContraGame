import sequelize from "../configDB";
import { DataTypes } from "sequelize";
import { initUser } from "./userModel";
import { initCharacter } from "./chacterModel";
import { initBullet } from "./bulletModels";
import { initMap } from "./mapModel";

export const User = initUser(sequelize, DataTypes);
export const Character = initCharacter(sequelize, DataTypes);
export const Bullet = initBullet(sequelize, DataTypes);
export const Map = initMap(sequelize, DataTypes);
