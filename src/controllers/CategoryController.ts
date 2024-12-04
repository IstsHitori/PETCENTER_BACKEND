import { Request, Response } from "express";
import Category from "../models/Category";
import { RequiredPathKeys } from "mongoose/types/inferschematype";
import { CATEGORY_ERRORS } from "../utils/errors";
export class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    try {
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
  static deleteCategory = async (req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category){
            const error = new Error(CATEGORY_ERRORS.CATEGORY_DOESNT_EXIST);
            return res.status(404).json({msg:error.message});
        }
        await category.deleteOne();
        res.send("Se ha eliminado la categoria");
    }catch(error){
        console.log(error);
    }
  }
}
