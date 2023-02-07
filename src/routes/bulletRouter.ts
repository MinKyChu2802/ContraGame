import express from "express";
import { bulletController } from "../controllers/bulletController";
import { verify } from "../utils";

const router = express.Router();

router.post("/bullet", verify, bulletController.addBullet);
router.get("/bullet", verify, bulletController.getAllBullet);
router.get("/bullet/:id", verify, bulletController.getOneBullet);
router.put("/bullet/:id", verify, bulletController.updateBullet);
router.delete("/bullet:id", verify, bulletController.deleteBullet);

export default router;
