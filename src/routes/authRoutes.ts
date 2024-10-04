import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
const router = Router();

router.post(
  "/create-account",
  body("name")
    .notEmpty()
    .withMessage("El nombre del veterinario es obligatorio"),
  body("userName")
    .notEmpty()
    .withMessage("El nombre de usuario del veterinario es obligatorio")
    .isLength({ min: 4 })
    .withMessage("El nombre de usuario debe ser mínimo 4 carácteres"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("El password del veterinario debe ser mínimo 6 carácteres")
    .notEmpty()
    .withMessage("El password del veterinario es obligatorio"),
  handleInputErrors,
  AuthController.createAccount
);
router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("El token no debe ir vacío"),
  handleInputErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("userName")
    .notEmpty()
    .withMessage("El nombre de usuario del veterinario es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("El password del veterinario es obligatorio"),
  handleInputErrors,
  AuthController.login
);
router.put(
  "/update-account/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del veterinario es obligatorio"),
  body("userName")
    .notEmpty()
    .withMessage("El nombre de usuario del veterinario es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("El password del veterinario es obligatorio"),
  handleInputErrors,
  authenticate,
  AuthController.updateAccount
);
router.get(
  "/get-profile",
  authenticate,
  AuthController.getProfile
);
router.patch(
  "/update-password/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("password").notEmpty().withMessage("La contraseña no puede estar vacía"),
  authenticate,
  AuthController.updatePassword
);
export default router;
