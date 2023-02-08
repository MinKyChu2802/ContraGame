import express from "express";
import { characterController } from "../controllers/charaterController";
import { verify } from "../utils";

const router = express.Router();

router.post("/character", verify, characterController.addCharacter);
router.get("/character", verify, characterController.getAllCharacter);
router.get("/character/:id", verify, characterController.getOneCharacter);
router.put("/character/:id", verify, characterController.updateCharacter);
router.delete("/character/:id", verify, characterController.deleteCharacter);

export default router;
