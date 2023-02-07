export type Model = {
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserModel = Model & {
  id?: string;
  username?: string;
  password?: string;
  isAdmin?: boolean;
  repeatPassword?: string;
};

export type MapModel = Model & {
  id?: string;
  mapName?: string;
};

export type BulletModel = Model & {
  id?: string;
  bulletName?: string;
  type?: string;
};

export type CharacterModel = Model & {
  id?: string;
  name?: string;
  score?: number;
  mapId?: string | null;
  bulletId?: string;
};
