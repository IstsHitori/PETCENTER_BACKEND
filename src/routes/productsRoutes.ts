import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { body,param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ProductController } from "../controllers/ProductController";

const router = Router();

router.get("/",authenticate,ProductController.getAllProducts)
export default router;