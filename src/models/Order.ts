import mongoose, { Document, Schema, Types } from "mongoose";
import { IOrder_Item, OrderItemsSchema } from "./OrderItem";

export interface IOrder extends Document {
  customer: Types.ObjectId;
  items: IOrder_Item[];
  total_amount: Number;
  date: Date;
}

const OrderSchema: Schema = new Schema({
  customer: {
    type: Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  items: [OrderItemsSchema],
  total_amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: function () {
      return new Date();
    },
  },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
