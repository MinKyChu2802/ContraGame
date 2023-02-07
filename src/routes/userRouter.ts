import express from "express";
import { userController } from "../controllers/userController";
import { verify } from "../utils";

const router = express.Router();

router.post("/sign-up", userController.addUser);
router.get("/user", verify, userController.getAllUser);
router.get("/user/:id", verify, userController.getOneUser);
router.put("/user/:id", verify, userController.updateUser);
router.delete("/user:id", verify, userController.deleteUser);

export default router;
