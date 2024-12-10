import { Request, Response } from "express";
import { Product } from "../models/Product";
import { ORDER_ERRORS, PRODUCT_ERRORS } from "../utils/errors";
import { Service } from "../models/Service";
import { Order } from "../models/Order";
import mongoose from "mongoose";

export class ProductController {
  static createProduct = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const searchProduct = await Product.findOne({ name });
      if (searchProduct) {
        const error = new Error(PRODUCT_ERRORS.PRODUCT_EXIST);
        return res.status(400).json({ msg: error.message });
      }
      const product = new Product(req.body);
      await product.save();

      res.send("Se ha creado el producto");
    } catch (error) {
      console.log(error);
    }
  };
  static getAllProducts = async (req: Request, res: Response) => {
    try {
      const array_products = await Product.find().populate(
        "category",
        "-_id name"
      );
      return res.json({ products: array_products });
    } catch (error) {
      console.log(error);
    }
  };
  static deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      const objectId = new mongoose.Types.ObjectId(id);

      if (!product) {
        const error = new Error(PRODUCT_ERRORS.PRODUCT_DOESNT_EXIST);
        return res.status(404).json({ msg: error.message });
      }
      //Buscamos si ese producto está en un servicio o en una orden,
      const existProductInService = await Service.findOne({
        product: objectId,
      });
      const existProductInOrder = await Order.findOne({
        "items.product": objectId,
      });

      if (existProductInService) {
        const error = new Error(ORDER_ERRORS.PRODUCT_IN_SERVICE);
        return res.status(405).json({ msg: error.message });
      }
      if (existProductInOrder) {
        const error = new Error(ORDER_ERRORS.PRODUCT_IN_ORDER);
        return res.status(405).json({ msg: error.message });
      }
      product.isDeleted = true;
      await product.save();
      res.send("Se ha eliminado el producto");
    } catch (error) {
      console.log(error);
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price, witght, quantity, category, brand } = req.body;
      const searchProduct = await Product.findById(id);
      if (!searchProduct) {
        const error = new Error(PRODUCT_ERRORS.PRODUCT_DOESNT_EXIST);
        return res.status(404).json({ msg: error.message });
      }
      searchProduct.name = name;
      searchProduct.price = price;
      searchProduct.witght = witght;
      searchProduct.quantity = quantity;
      searchProduct.category = category;
      searchProduct.brand = brand;

      await searchProduct.save();
      res.send("Se ha actualizado el producto");
    } catch (error) {
      console.log(error);
    }
  };
}
