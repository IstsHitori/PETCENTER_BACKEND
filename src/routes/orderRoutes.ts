import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { OrderController } from "../controllers/OrderController";
import { handleInputErrors } from "../middleware/validation";
import { body } from "express-validator";
import { ORDER_ERRORS } from "../utils/errors";

const router = Router();

router.get("/", authenticate, OrderController.getAllOrders);
router.post(
  "/create-order",
  body("items").notEmpty().withMessage(ORDER_ERRORS.ITEM_EMPTY),
  body("customer").notEmpty().withMessage(ORDER_ERRORS.CUSTOMER_EMPTY),
  body("total_amount").notEmpty().withMessage(ORDER_ERRORS.TOTAL_AMOUNT_EMPTY),
  body("payment_method").notEmpty().withMessage(ORDER_ERRORS.METHOD_EMPTY),
  handleInputErrors,
  authenticate,
  OrderController.createOrder
);
export default router;
