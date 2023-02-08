import { Character } from "../models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(16).required(),
  score: Joi.string(),
});

// main work

// 1. create character

const addCharacter = async (req: Request, res: Response) => {
  const { name, score } = req.body;

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let info = {
    id: uuidv4(),
    name,
    score,
  };

  const character = await Character.create(info);

  res
    .status(200)
    .send({ character, message: "Create character successfully!" });
};

// 2 get all character

const getAllCharacter = async (req: Request, res: Response) => {
  let character = await Character.findAll({
    attributes: ["name", "score"],
  });
  res.status(200).send(character);
};

// 3 get single character

const getOneCharacter = async (req: Request, res: Response) => {
  let id = req.params.id;

  let character = await Character.findOne({
    where: { id },
    attributes: ["name", "score"],
  });
  res.status(200).send(character);
};

// 4 update single character

const updateCharacter = async (req: Request, res: Response) => {
  let id = req.params.id;

  let character = await Character.update(req.body, { where: { id } });
  res.status(200).send(character);
};

// 5 delete single character

const deleteCharacter = async (req: Request, res: Response) => {
  let id = req.params.id;

  await Character.destroy({ where: { id } });
  res.status(200).send("Character is deleted!");
};

export const characterController = {
  getAllCharacter,
  getOneCharacter,
  updateCharacter,
  deleteCharacter,
  addCharacter,
};
