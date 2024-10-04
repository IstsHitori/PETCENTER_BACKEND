import { Router } from "express";
import { body, param } from "express-validator";
import { HistoryController } from "../controllers/HistoryController";
import { authenticate } from "../middleware/auth";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-history",
  body("patient")
    .isMongoId()
    .withMessage("ID no válido")
    .notEmpty()
    .withMessage("El paciente no puede ir vacío"),
  body("history").notEmpty().withMessage("La historia no puede estar vacía"),
  handleInputErrors,
  authenticate,
  HistoryController.createHistory
);
router.get("/", authenticate, HistoryController.getAllHistories);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  authenticate,
  HistoryController.getHistoriesPatient
);
router.delete(
  "/delete-history/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  authenticate,
  HistoryController.deleteHistory
);

export default router;
