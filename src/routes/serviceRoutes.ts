import { Router } from "express";
import { handleInputErrors } from "../middleware/validation";
import { body, param } from "express-validator";
import { authenticate } from "../middleware/auth";
import { PATIENT_ERRORS, SERVICE_ERRORS } from "../utils/errors";
import { ServiceController } from "../controllers/ServiceController";

const router = Router();

router.post(
  "/create-service/:id",
  param("id").isMongoId().withMessage(PATIENT_ERRORS.ID_PATIENT_NOT_VALID),
  body("name").notEmpty().withMessage(SERVICE_ERRORS.NAME_EMPTY),
  body("price")
    .notEmpty()
    .withMessage(SERVICE_ERRORS.PRICE_EMPTY)
    .isNumeric()
    .withMessage(SERVICE_ERRORS.PRICE_NUMERIC),
  handleInputErrors,
  authenticate,
  ServiceController.orderService
);
router.get("/", authenticate, ServiceController.getAllServices);
router.delete(
  "/delete-service/:id",
  param("id").isMongoId().withMessage(SERVICE_ERRORS.ID_NOT_VALID),
  handleInputErrors,
  authenticate,
  ServiceController.deleteService
);
export default router;
