import { Router } from "express";
import { VeterinaryController } from "../controllers/VeterinaryController";
import { authenticate } from "../middleware/auth";
const router = Router();
router.get("/", authenticate, VeterinaryController.getAllVeterinary);

router.get("/:userName",authenticate, VeterinaryController.getVeterinaryByUserName);

export default router;
