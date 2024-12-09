import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrder_Item extends Document {
  product: Types.ObjectId;
  quantity: Number;
  price: Number;
}

export const OrderItemsSchema: Schema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
