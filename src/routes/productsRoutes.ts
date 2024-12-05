import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ProductController } from "../controllers/ProductController";
import { PRODUCT_ERRORS } from "../utils/errors";

const router = Router();

router.get("/", authenticate, ProductController.getAllProducts);
router.post(
  "/create-product",
  body("name").notEmpty().withMessage(PRODUCT_ERRORS.NAME_EMPTY),
  body("brand").notEmpty().withMessage(PRODUCT_ERRORS.BRAND_EMPTY),
  body("price")
    .notEmpty()
    .withMessage(PRODUCT_ERRORS.PRICE_EMPTY)
    .isNumeric()
    .withMessage(PRODUCT_ERRORS.PRICE_ARE_NOT_NUMBER),
  body("witght").notEmpty().withMessage(PRODUCT_ERRORS.WITGHT_EMPTY),
  body("quantity")
    .notEmpty()
    .withMessage(PRODUCT_ERRORS.QUANTITY_EMPTY)
    .isNumeric()
    .withMessage(PRODUCT_ERRORS.QUANTITY_ARE_NOT_NUMBER),
  body("category")
    .isMongoId()
    .withMessage(PRODUCT_ERRORS.CATEGORY_ID_NOT_VALID)
    .notEmpty()
    .withMessage(PRODUCT_ERRORS.CATEGORY_EMPTY),
  handleInputErrors,
  authenticate,
  ProductController.createProduct
);
router.put(
  "/update-product/:id",
  body("name").notEmpty().withMessage(PRODUCT_ERRORS.NAME_EMPTY),
  body("brand").notEmpty().withMessage(PRODUCT_ERRORS.BRAND_EMPTY),
  body("price")
    .notEmpty()
    .withMessage(PRODUCT_ERRORS.PRICE_EMPTY)
    .isNumeric()
    .withMessage(PRODUCT_ERRORS.PRICE_ARE_NOT_NUMBER),
  body("witght").notEmpty().withMessage(PRODUCT_ERRORS.WITGHT_EMPTY),
  body("quantity")
    .notEmpty()
    .withMessage(PRODUCT_ERRORS.QUANTITY_EMPTY)
    .isNumeric()
    .withMessage(PRODUCT_ERRORS.QUANTITY_ARE_NOT_NUMBER),
  body("category")
    .isMongoId()
    .withMessage(PRODUCT_ERRORS.CATEGORY_ID_NOT_VALID)
    .notEmpty()
    .withMessage(PRODUCT_ERRORS.CATEGORY_EMPTY),
  param("id").isMongoId().withMessage(PRODUCT_ERRORS.PRODUCT_ID_NOT_VALID),
  handleInputErrors,
  authenticate,
  ProductController.updateProduct
);
router.delete(
  "/delete-product/:id",
  param("id").isMongoId().withMessage(PRODUCT_ERRORS.PRODUCT_ID_NOT_VALID),
  handleInputErrors,
  authenticate,
  ProductController.deleteProduct
);
export default router;
