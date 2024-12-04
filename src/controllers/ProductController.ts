import { Request, Response } from "express";
import { Product } from "../models/Product";
import { PRODUCT_ERRORS } from "../utils/errors";

export class ProductController {
  static createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.send("Se ha creado el producto");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProducts = async (req: Request, res: Response) => {
    try {
      const array_products = await Product.find().populate("category","-_id name");
      return res.json({ products: array_products });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteProduct = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            const error = new Error(PRODUCT_ERRORS.PRODUCT_DOESNT_EXIST);
            return res.status(404).json({msg:error.message});
        }
        await product.deleteOne();
        res.send("Se ha eliminado el producto")
    }catch(error){
        console.log(error);
    }
  }
}
