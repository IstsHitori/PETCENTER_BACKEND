import { Request, Response } from "express";
import { Order } from "../models/Order";
import { IOrder_Item } from "../models/OrderItem";
import { Customer, ICustomer } from "../models/Customer";

interface ICreateOrder {
  items: IOrder_Item[];
  customer: ICustomer;
  total_amount: Number;
  payment_method: String;
}
export class OrderController {
  static getAllOrders = async (req: Request, res: Response) => {
    try {
      const arrayOrders = await Order.find()
        .populate("customer")
        .populate("items.product", "_id name");
      return res.json({ orders: arrayOrders });
    } catch (error) {
      console.log(error);
    }
  };
  static createOrder = async (req: Request, res: Response) => {
    try {
      const { items, customer, total_amount, payment_method }: ICreateOrder =
        req.body;
      const searchCustomer = await Customer.findOne({ nit: customer.nit });
      if (searchCustomer) {
        const order = new Order({
          items,
          total_amount,
          customer: searchCustomer._id,
          payment_method,
        });
        await order.save();
        return res.send("Orden creada");
      }
      const newCustomer = new Customer(customer);
      const order = new Order({
        items,
        total_amount,
        customer: newCustomer._id,
        payment_method
      });
      await newCustomer.save();
      await order.save();
    } catch (error) {
      console.log(error);
    }
  };
}
