export type Model = {
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserModel = Model & {
  id?: string;
  username?: string;
  password?: string;
  isAdmin?: boolean;
  repeatPassword?: string
};

