import { Request, Response } from "express";
import Category from "../models/Category";
import { CATEGORY_ERRORS } from "../utils/errors";
import { Product } from "../models/Product";
export class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const searchCategory = await Category.findOne({ name });
      if (searchCategory) {
        const error = new Error(CATEGORY_ERRORS.CATEGORY_EXIST);
        return res.status(402).json({ msg: error.message });
      }
      const category = new Category(req.body);
      await category.save();
      res.send("Se ha creado la categoria");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllCategories = async (req: Request, res: Response) => {
    try {
      const array_categories = await Category.find();
      res.send({
        categories: array_categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        const error = new Error(CATEGORY_ERRORS.CATEGORY_DOESNT_EXIST);
        return res.status(404).json({ msg: error.message });
      }
      
      const genericCategory = await Category.findOne({ name: "todos" });
      if (!genericCategory) {
        const error = new Error(CATEGORY_ERRORS.CATEGORY_DOESNT_EXIST);
        return res.status(404).json({ msg: error.message });
      }

      await Product.updateMany(
        { category: id },
        { category: genericCategory._id }
      );

      await category.deleteOne();
      res.send("Se ha eliminado la categoria");
    } catch (error) {
      console.log(error);
    }
  };
}
