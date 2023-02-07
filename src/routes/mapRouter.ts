import express from "express";
import { mapController } from "../controllers/mapController";
import { verify } from "../utils";

const router = express.Router();

router.post("/map", verify, mapController.addMap);
router.get("/map", verify, mapController.getAllMap);
router.get("/map/:id", verify, mapController.getOneMap);
router.put("/map/:id", verify, mapController.updateMap);
router.delete("/map:id", verify, mapController.deleteMap);

export default router;
