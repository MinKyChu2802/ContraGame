import { Bullet } from "../models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const schema = Joi.object({
  bulletName: Joi.string().required(),
  type: Joi.string().required(),
});

// main work

// 1. create bullet

const addBullet = async (req: Request, res: Response) => {
  const { bulletName, type } = req.body;

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let info = {
    id: uuidv4(),
    bulletName,
    type,
  };

  const bullet = await Bullet.create(info);

  res.status(200).send({ bullet, message: "Create Bullet successfully!" });
};

// 2 get all bullet

const getAllBullet = async (req: Request, res: Response) => {
  let bullet = await Bullet.findAll({
    attributes: ["bulletName", "type"],
  });
  res.status(200).send(bullet);
};

// 3 get single bullet

const getOneBullet = async (req: Request, res: Response) => {
  let id = req.params.id;

  let bullet = await Bullet.findOne({
    where: { id },
    attributes: ["bulletName", "type"],
  });
  res.status(200).send(bullet);
};

// 4 update single bullet

const updateBullet = async (req: Request, res: Response) => {
  let id = req.params.id;

  const { bulletName, type } = req.body;

  let bullet = await Bullet.update({ bulletName, type }, { where: { id } });
  res.status(200).send(bullet);
};

// 5 delete single bullet

const deleteBullet = async (req: Request, res: Response) => {
  let id = req.params.id;

  await Bullet.destroy({ where: { id } });
  res.status(200).send("Bullet is deleted!");
};

export const bulletController = {
  getAllBullet,
  getOneBullet,
  updateBullet,
  deleteBullet,
  addBullet,
};
