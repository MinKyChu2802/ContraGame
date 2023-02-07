import express, { Request, Response } from "express";
import { UserModel } from "../types";
import jwt from "jsonwebtoken";
import { MY_SECRET_KEY } from "../config/constant";
import Joi from "joi";
import { User } from "../models";
import bcrypt from "bcrypt";

let refreshTokens: any = [];

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(16).required(),
  password: Joi.string().pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!#%*?&]{3,16}$"
    )
  ),
});

const generateAccessToken = (user: UserModel) => {
  return jwt.sign({ id: user.id }, MY_SECRET_KEY, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (user: UserModel) => {
  return jwt.sign({ id: user.id }, MY_SECRET_KEY);
};

const router = express.Router();

// API sign-in
router.post("/sign-in", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user: any = await User.findOne({ where: { username } });

  if (!user) return res.status(400).send("Invalid username or password");

  const isValidPassword = bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(400).send("Invalid email or password");

  const accessToken = generateAccessToken({
    username: user?.username,
    id: user?.id,
  });
  const refreshToken = generateRefreshToken({
    username: user?.username,
    id: user?.id,
  });

  refreshTokens.push(refreshToken);

  res.status(200).json({
    accessToken,
    refreshToken,
    username,
    message: "Login successfully",
  });
});

// API refresh token

router.post("/refresh-token", (req: Request, res: Response) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, MY_SECRET_KEY, (err: any, user: any) => {
    refreshTokens = refreshTokens.filter(
      (token: any) => token !== refreshToken
    );

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

export default router;
