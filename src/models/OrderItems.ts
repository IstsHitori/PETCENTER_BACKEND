import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrder_Items extends Document {
  product: Types.ObjectId;
  quantity: Number;
  price: Number;
}

const OrderItemsSchema: Schema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    types: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const OrderItems = mongoose.model<IOrder_Items>(
  "OrderItems",
  OrderItemsSchema
);
