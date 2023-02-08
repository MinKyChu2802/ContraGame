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

// 1:1
User.belongsTo(Map, { foreignKey: "mapId" });
Map.hasOne(User, { foreignKey: "mapId" });

User.belongsTo(Character, { foreignKey: "characterId" });
Character.hasOne(User, { foreignKey: "characterId" });

Character.belongsTo(User, { foreignKey: "characterId" });
User.hasOne(Character, { foreignKey: "characterId" });

User.belongsTo(Bullet, { foreignKey: "selectedBulletId" });
Bullet.hasOne(User, { foreignKey: "selectedBulletId" });

// 1:M
Bullet.hasMany(User, { foreignKey: "bulletId" });
User.belongsTo(Bullet, { foreignKey: "bulletId" });
