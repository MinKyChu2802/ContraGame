import jwt from "jsonwebtoken";
import { MY_SECRET_KEY } from "../config/constant";

/**
 * Verify token
 *
 * @param req
 * @param res
 * @param next
 */
export const verify = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, MY_SECRET_KEY, (err: any, user: any) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};
