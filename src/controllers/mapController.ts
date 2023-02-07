import { Map } from "../models";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";

const schema = Joi.object({
  mapName: Joi.string().required(),
});

// main work

// 1. create map

const addMap = async (req: Request, res: Response) => {
  const { mapName } = req.body;

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let info = {
    id: uuidv4(),
    mapName,
  };

  const map = await Map.create(info);

  res.status(200).send({ map, message: "Create Map successfully!" });
};

// 2 get all map

const getAllMap = async (req: Request, res: Response) => {
  let map = await Map.findAll({
    attributes: ["mapName"],
  });
  res.status(200).send(map);
};

// 3 get single map

const getOneMap = async (req: Request, res: Response) => {
  let id = req.params.id;

  let map = await Map.findOne({
    where: { id },
    attributes: ["mapName"],
  });
  res.status(200).send(map);
};

// 4 update single map

const updateMap = async (req: Request, res: Response) => {
  let id = req.params.id;

  let map = await Map.update(req.body, { where: { id } });
  res.status(200).send(map);
};

// 5 delete single map

const deleteMap = async (req: Request, res: Response) => {
  let id = req.params.id;

  await Map.destroy({ where: { id } });
  res.status(200).send("Map is deleted!");
};

export const mapController = {
  getAllMap,
  getOneMap,
  updateMap,
  deleteMap,
  addMap,
};
