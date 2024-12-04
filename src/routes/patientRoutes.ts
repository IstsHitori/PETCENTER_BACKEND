import { Router } from "express";
import { body, param } from "express-validator";
import { PatientController } from "../controllers/PatientController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create-patient",
  body("name")
    .notEmpty()
    .withMessage("El nombre de la mascota no puede estar vacío"),
  body("propietor")
    .notEmpty()
    .withMessage(
      "El nombre del propietario de la mascota no puede estar vacío"
    ),
  body("docPropietor")
    .notEmpty()
    .withMessage("El documento del propietario no puede estar vacío"),
  body("telephone")
    .notEmpty()
    .withMessage("El número de teléfono del propietario no puede estar vacío"),
  body("size").notEmpty().withMessage("El tamaño no puede estar vacío"),
  body("typePet")
    .notEmpty()
    .withMessage("El tipo de mascota no puede estar vacío"),
  handleInputErrors,
  authenticate,
  PatientController.createPatient
);
router.get("/", authenticate, PatientController.getAllPatients);
router.get(
  "/:name",
  param("name")
    .notEmpty()
    .withMessage("El nombre de la mascota no puede estar vacío"),
  handleInputErrors,
  authenticate,
  PatientController.getPatientByName
);
router.get(
  "/get-patient/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  authenticate,
  PatientController.getPatientById
);
router.put(
  "/update-patient/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  authenticate,
  PatientController.updatePatientByID
);

router.delete(
  "/delete-patient/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  authenticate,
  PatientController.deletePatientByID
);

export default router;
