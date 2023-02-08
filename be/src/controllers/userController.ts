import { User } from "../models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { SALT_ROUNDS } from "../config/constant";
import bcrypt from "bcrypt";
import Joi from "joi";
import { UserModel } from "../types";

let hash: any;

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(16).required(),
  password: Joi.string().required(),
  // .pattern(
  //   new RegExp(
  //     "^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{3,16}$"
  //   )
  // )
  repeatPassword: Joi.ref("password"),
  isAdmin: Joi.boolean().required(),
  // email: Joi.string()
  //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

// main work

// 1. create user

const addUser = async (req: Request, res: Response) => {
  const { username, password, repeatPassword, isAdmin } = req.body as UserModel;
  hash = await bcrypt.hash(password!.toString(), SALT_ROUNDS);

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let info = {
    id: uuidv4(),
    username,
    password: hash,
    isAdmin,
  };

  if (password !== repeatPassword) {
    return res.status(400).send("Password and Repeat Password must match");
  }

  const user = await User.create(info);

  res.status(200).send({ data: user, message: "Create user successfully!" });
};

// 2 get all user

const getAllUser = async (req: Request, res: Response) => {
  let users = await User.findAll({
    // attributes: ["username", "isAdmin"],
  });
  res.status(200).send(users);
};

// 3 get single user

const getOneUser = async (req: Request, res: Response) => {
  let id = req.params.id;

  let user = await User.findOne({
    where: { id },
  });
  res.status(200).send(user);
};

// 4 update single user

const updateUser = async (req: Request, res: Response) => {
  let id = req.params.id;

  let user = await User.update(req.body, { where: { id } });
  res.status(200).send(user);
};

// 5 delete single user

const deleteUser = async (req: Request, res: Response) => {
  let id = req.params.id;

  await User.destroy({ where: { id } });
  res.status(200).json({ message: "User is deleted!" });
};

export const userController = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  addUser,
};
