import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { handleInputErrors } from "../middleware/validation";
import { CategoryController } from "../controllers/CategoryController";
import { body, param } from "express-validator";
import { CATEGORY_ERRORS } from "../utils/errors";

const router = Router();

router.post(
  "/create-category",
  body("name").notEmpty().withMessage(CATEGORY_ERRORS.NAME_EMPTY),
  body("description").notEmpty().withMessage(CATEGORY_ERRORS.DESCRIPTION_EMPTY),
  handleInputErrors,
  authenticate,
  CategoryController.createCategory
);
router.get("/", authenticate, CategoryController.getAllCategories);
router.delete(
  "/delete-category/:id",
  param("id").isMongoId().withMessage(CATEGORY_ERRORS.ID_NOT_VALID),
  handleInputErrors,
  authenticate,
  CategoryController.deleteCategory
);
export default router;
